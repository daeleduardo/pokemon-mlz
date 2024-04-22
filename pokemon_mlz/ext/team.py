from sqlite3.dbapi2 import DataError, DatabaseError
from .sqlite_conn import sqlite_conn
from .pokedex import pokedex

#classe reponsável por buscar e editar as informações referentes ao time
class team:

    def __init__(self):
        self.__db = sqlite_conn()
        self.__MAX_POKEMONS = 6
    #metodo que retorna o número de máximo de pokemons que se pode ter em um time 
    def team_size(self):
        return self.__MAX_POKEMONS

    #metodo que valida se já existe um mesmo time com o mesmo treinador
    #se sim retorna erro, pois a operação deveria ser de edição não de inserção.
    def validate_team_name_use(self, data):
        param = (data['team'], data['trainer'])
        sql = "SELECT COUNT(1) as count FROM TEAM WHERE NAME_TEAM = ? AND NAME_TRAINER = ? ;"
        result = self.__db.query_execute(sql, param)
        if result[0]['count'] == 0:
            return True
        else:
            raise DataError(
                "Failure do save your team name and trainer, team name already in use ", 400)

    #busca os pokemons contidos no time informado.
    def get_pokemons_team(self, data):

        return pokedex().get_pokemons(data)

    #busca todos os times cadastrados
    def get_teams(self, data):

        if (data['id'] is not None):
            where = "WHERE ID_TEAM = " + str(data['id'])
        else:
            where = ''

        sql = """
            SELECT 
                ID_TEAM AS ID,
                NAME_TEAM as TEAM,
                NAME_TRAINER as TRAINER
            FROM
                TEAM
        """ + where

        result = self.__db.query_execute(sql)

        return result

    #Edita ou insere um registro de time
    def save_pokemons_team(self, data):
        try:
            #valida o tamanho do time, se possui de 1 a 6 pokemons
            if len(data['pokemons']) not in range(1, self.team_size()+1):
                raise DataError(
                    "Failure do save your pokemons, your team size is zero or bigger than " + str(self.team_size()) + "!", 400)

            #valida se o campo team foi informado e se sim, verifica se não é 'None'
            if  (('team' not in data or data['trainer'] is None) 
                #valida se o campo trainer foi informado e se sim, verifica se não é 'None'
                or ('trainer' not in data or data['trainer'] is None) 
                #valida se o campo id foi informado e se sim, verifica se não é 'None' e se é um número
                or ('id' in data and data['id'] is not None and not(isinstance(data['id'], int)))):
                raise DataError(
                    "Can't handle team information, please check your payload", 400)

            #valida se o nome do time possui cinco caracteres ou mais.
            if len(str(data["team"])) < 5:
                raise DataError(
                    "Failure do save your pokemons, please, check your team name length ", 400)

            #valida se o nome do time e treinador estão em uso
            self.validate_team_name_use(data)

            #verifica se o campo id foi inserido para saber se a operação em TEAM será um UPDATE ou INSERT
            id_team = None

            if 'id' not in data or data['id'] is None:
                param = (data['team'], data['trainer'])
                sql = "INSERT INTO TEAM (NAME_TEAM,NAME_TRAINER) VALUES (?,?)"
                self.__db.query_execute(sql, param)
                id_team = self.__db.last_row_id()

            if 'id' in data and data['id'] is not None and isinstance(data['id'], int):
                param = (data['team'], data['trainer'], data['id'])
                sql = "UPDATE TEAM SET NAME_TEAM = ?,NAME_TRAINER = ? WHERE ID_TEAM = ?"
                self.__db.query_execute(sql, param)
                id_team = data['id']
                self.remove_pokemons_team(data)

            param = [(id_team, pokemon) for pokemon in data['pokemons']]
            sql = "INSERT INTO POKEMON_TEAM (ID_TEAM,ID_POKEMON) VALUES (?,?)"
            self.__db.query_execute(sql, param, True)
            return {"success": True}
        except DataError as e:
            raise DataError("Error to save team: " + str(e.args[0]), 400)

    #remove os pokemons de um time de acordo com o ID do time.
    def remove_pokemons_team(self, data):
        try:
            if "id" not in data or isinstance(data["id"], str):
                raise DataError("Failure to remove team", 400)
            param = (data['id'],)
            sql = "DELETE FROM POKEMON_TEAM WHERE ID_TEAM = ?"
            self.__db.query_execute(sql, param)
            return {"success": True}
        except DatabaseError as e:
            raise DatabaseError(
                "Error to update pokemons team" + str(e.args[0]), 500)

    #exclui um time, excluindo os pokemons referente a aquele time primeiro
    def remove_team(self, data):
        try:
            if "team" not in data or isinstance(data["team"], str):
                raise DataError("Failure to remove team", 400)
            param = (data['team'],)
            sql = "DELETE FROM POKEMON_TEAM WHERE ID_TEAM = ?"
            self.__db.query_execute(sql, param)
            sql = "DELETE FROM TEAM WHERE ID_TEAM = ?"
            self.__db.query_execute(sql, param)
            return {"success": True}
        except DatabaseError as e:
            raise DatabaseError(
                "Error to update pokemons team" + str(e.args[0]), 500)
