from .sqlite_conn import sqlite_conn

#classe responsável por buscar as informações de pokemons.
class pokedex:

    def __init__(self):
        self.__db = sqlite_conn()

    #metodo que retorna uma lista de pokemons com base nos campos informados para filtro
    def get_pokemons(self, data):

        where = '1=1 '
        having = ''
        count_types = 0
        select_team = ''
        from_team = ''

        #aplica os filtros de acordo com as chaves existentes no dicionário
        if ('id_team' in data.keys()):
            where += "AND PTR.ID_TEAM = '" + str(data['id_team']) + "'"
            select_team = ', TM.NAME_TRAINER AS TRAINER'
            from_team = """ INNER JOIN POKEMON_TEAM PTR ON PTR.ID_POKEMON = P.ID_POKEMON
                            INNER JOIN TEAM TM ON TM.ID_TEAM = PTR.ID_TEAM"""

        if ('number' in data.keys()):
            where += "AND P.ID_POKEMON = '" + str(data['number']) + "'"

        if ('name' in data.keys()):
            where += "AND P.HASH_NAME = '" + \
                self.__db.get_id(data['name']) + "'"

        if (('first_type' in data and data['first_type'] != '') or ('second_type' in data and data['second_type'] != '')):
            where = where + "AND TP.NAME IN ("
            if ('first_type' in data and data['first_type'] != ''):
                count_types += 1
                where = where + "'" + data['first_type'] + "'"
            if ('second_type' in data and data['second_type'] != ''):
                count_types += 1
                where = where + ",'" + data['second_type'] + "'"
            having = "GROUP BY P.ID_POKEMON HAVING COUNT(1) = " + \
                str(count_types)
            where = where + ")"

        sql = """
            SELECT
                P.ID_POKEMON AS ID,
                P.NAME,
                P.HEIGHT,
                P.WEIGHT,
                P.XP,
                P.IMAGE,
                GROUP_CONCAT(T.NAME) AS TYPES"""+select_team+"""
            FROM    POKEMON P
                    INNER JOIN POKEMON_TYPE PT ON PT.ID_POKEMON = P.ID_POKEMON
                    INNER JOIN TYPE T ON PT.ID_TYPE = T.ID_TYPE"""+from_team+"""
                    WHERE P.ID_POKEMON IN (
                            SELECT 
                                P.ID_POKEMON
                            FROM
                                POKEMON P
                                INNER JOIN POKEMON_TYPE PTP ON PTP.ID_POKEMON = P.ID_POKEMON
                                INNER JOIN TYPE TP ON PTP.ID_TYPE = TP.ID_TYPE
                                LEFT JOIN POKEMON_TEAM PTR ON PTR.ID_POKEMON = P.ID_POKEMON
                                LEFT JOIN TEAM TM ON TM.ID_TEAM = PTR.ID_TEAM
                            WHERE
                                """+where+having + """                   
                    ) GROUP BY P.ID_POKEMON"""

        result = self.__db.query_execute(sql)
        #os tipos são retornados em um group_concat
        #método que o coverte para um array.
        for row in result:
            row["TYPES"] = str(row["TYPES"]).split(",")

        return result
