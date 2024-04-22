import sqlite3
import os
import json
import hashlib
import re
from sqlite3.dbapi2 import DataError, DatabaseError
from flask import g

#classe responsável pelo acesso a base de dados
class sqlite_conn:

    def __init__(self):
        #verifica se é o ambiente de testes ou não para informar qual o arquivo a ser carregado.
        if(os.getenv('FLASK_ENV') == 'test'):
            self.__path = os.getcwd()+"/databases/test.db"
        else:
            self.__path = os.getcwd()+"/databases/pokedex.db"            
        self.__db = None
        self.__cursor = None
        self.__check_tables()

    #verifica se arquivo já foi aberto se não foi, o abre
    def __open_connection(self):
        try:
            self.__db = getattr(g, '_database', None)
            self.__cursor = getattr(g, '_cursor', None)
            if self.__db is None:
                self.__db = g._database = sqlite3.connect(self.__path)    
            if self.__cursor is None:
                self.__cursor = g._cursor = self.__db.cursor()

        except DatabaseError as e:
            raise DatabaseError('Error to start sqlite instance ' + str(e.args[0]),500)

    #verifica se arquivo está aberto, se sim, fecha o arquivo e o cursor.
    def __close_connection(self):
        self.__db = getattr(g, '_database', None)
        if self.__db is not None:
            setattr(g, '_database', None)
            setattr(g, '_cursor', None)
            self.__cursor.close()
            self.__db.close()

    #verifica se a banco está OK para uso.
    def __check_tables(self):
        self.__open_connection()
        #Verifica se todas as tabelas existem no banco de dados.
        self.__cursor.execute(
            """
            SELECT count(1) 
            FROM sqlite_master 
            WHERE type='table' 
                AND name in ('TEAM','TYPE','POKEMON_TEAM','POKEMON','POKEMON_TYPE');
            """
        )
        exists_tables = self.__cursor.fetchone()
        if exists_tables[0] == 5:
            return
        #se estiver faltando alguma tabela excluí todas para garantir a integridade
        script = ''
        if exists_tables[0] > 0 and exists_tables[0] != 5:
            script += self.___drop_tables_script()
        #script para criação das tabelas
        if exists_tables[0] != 5:
            script += self.___create_tables_script()

        if script != '':
            cursor = self.__db.cursor()
            cursor.executescript(
                script
            )

        #apos ter o banco "zerado" popula as tabelas com as informações referentes aos pokemons
        file = open(os.getcwd()+"/pokedex.json",)
        json_content = json.loads(file.read())
        list_type = []
        list_pokemon = []
        list_pokemon_type = []
        #para cada registro monta os arrays e tuplas com as informações de 
        #pokemons, tipos e dos vinculos de pokemons por tipo
        for item in json_content["pokemon"]:

            list_type.extend(item["types"])

            for pokemon_type in item["types"]:
                list_pokemon_type.append((item['id'], pokemon_type))

            list_pokemon.append((
                item['id'],
                item['name'],
                item['height'],
                item['weight'],
                item['xp'],
                item['image'],
                self.get_id(item['name'])
            ))

        list_type = list(dict.fromkeys(list_type))
        for item in list_type:
            self.__cursor.execute("""
            INSERT INTO TYPE (NAME)
            VALUES (?)
            """, (item,))

        self.__cursor.executemany("""
        INSERT INTO POKEMON (
            ID_POKEMON,
            NAME,
            HEIGHT,
            WEIGHT,
            XP ,
            IMAGE,
            HASH_NAME
        )
        VALUES (?,?,?,?,?,?,?)
        """, list_pokemon)

        self.__cursor.executemany("""
        INSERT INTO POKEMON_TYPE (
            ID_POKEMON,
            ID_TYPE
            )
        VALUES (?,(SELECT ID_TYPE FROM TYPE WHERE NAME = ?))
        """, list_pokemon_type)

        self.__db.commit()

        file.close()

        self.__close_connection()

    #metodo que executa as consultas
    #responsável por abrir a conexão, executar e fechar a conexão
    def query_execute(self, sql, param=(), many=False):
        try:
            self.__open_connection()
            result = True
            if (many):
                self.__cursor.executemany(sql, param)
            else:
                self.__cursor.execute(sql, param)
            # Se é um select (valida se a string começa com a palavra SELECT)
            #converte o resultado em um dicionário para facilitar a manipulação dos dados.
            if re.search("^SELECT",sql.strip().upper()):
                column_names = [col[0] for col in self.__cursor.description]
                result = [dict(zip(column_names, row))
                            for row in self.__cursor.fetchall()]
            else :
                self.__db.commit()

            self.__close_connection()
            return result
        except DataError as e:
            self.__db.rollback()
            raise DataError("Failed to execute query: "+str(e.args[0]),500)

    #Não é recomendável montar indices com base em campos de texto.
    #Como a busca por nome de pokemon era um requisito obrigatório
    #foi criado método que converte o texto em um hash numérico
    #é usado a concatenação de dois hash para precaver ao máximo a possibilidade de um número repetido.
    def get_id(self, txt):
        s = str(txt)
        sha_hash = int(hashlib.sha256(
            s.encode('utf-8')).hexdigest(), 16) % 10**8
        md5_hash = int(hashlib.md5(s.encode('utf-8')).hexdigest(), 16) % 10**8
        return str(sha_hash)+str(md5_hash)

    #retorna o ultimo id, para obter o registro da ultima linha criada
    def last_row_id(self):
        return self.__cursor.lastrowid

    #script para apagar as tabelas
    def ___drop_tables_script(self):
        script = """
            DROP TABLE IF EXISTS POKEMON_TYPE;        
            DROP TABLE IF EXISTS POKEMON_TEAM;            
            DROP TABLE IF EXISTS POKEMON;
			DROP TABLE IF EXISTS TEAM;
            DROP TABLE IF EXISTS TYPE;

            """
        return script

    #script para criar as tabelas
    def ___create_tables_script(self):
        script = """
                    CREATE TABLE TEAM ( ID_TEAM INTEGER NOT NULL PRIMARY KEY,
                                    NAME_TEAM TEXT NOT NULL,
                                    NAME_TRAINER TEXT NOT NULL,                
                                    UNIQUE(NAME_TEAM,NAME_TRAINER) );

            CREATE TABLE TYPE ( ID_TYPE INTEGER NOT NULL PRIMARY KEY,
                                NAME TEXT NOT NULL );

            CREATE TABLE POKEMON_TYPE ( ID_POKEMON INTEGER NOT NULL, 
                                        ID_TYPE INTEGER NOT NULL, 
            FOREIGN KEY (ID_POKEMON) REFERENCES POKEMON (ID_POKEMON),
            FOREIGN KEY (ID_TYPE) REFERENCES TYPE (ID_TYPE),
            UNIQUE(ID_POKEMON,ID_TYPE)
                                        );
            CREATE TABLE POKEMON (  ID_POKEMON INTEGER NOT NULL PRIMARY KEY,
                                    NAME TEXT NOT NULL,
                                    HEIGHT FLOAT NOT NULL,
                                    WEIGHT FLOAT NOT NULL,
                                    XP INT NOT NULL,
                                    IMAGE TEXT NOT NULL,
                                    HASH_NAME TEXT NOT NULL
            );

            CREATE UNIQUE INDEX INDEX_HASH_NAME ON POKEMON(HASH_NAME);

            CREATE TABLE POKEMON_TEAM ( ID_POKEMON INTEGER NOT NULL, 
                                        ID_TEAM INTEGER NOT NULL, 
            FOREIGN KEY (ID_POKEMON) REFERENCES POKEMON (ID_POKEMON),
            FOREIGN KEY (ID_TEAM) REFERENCES TEAM (ID_TEAM)
            UNIQUE(ID_POKEMON,ID_TEAM));
            """
        return script
