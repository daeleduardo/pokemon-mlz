from sqlite3.dbapi2 import DataError
from flask import Flask, render_template, jsonify, json, request, Response
from werkzeug.exceptions import HTTPException
from flask_caching import Cache
import os

#Lê o arquivo .env e carrega suas variaveis para a aplicação
def __load_env_file():
    with open(os.getcwd()+'/.env', 'r') as fh:
        vars_dict = dict(
            tuple(line.rstrip("\n").split('='))
            for line in fh.readlines() if not line.startswith('#')
        )
    os.environ.update(vars_dict)

#metodo que cria/inicia a aplicação
def create_app():
    app = Flask(__name__)
    #inicia o cache que será usado no endpoint de busca de informações de pokemons
    app.config['CACHE_TYPE'] = 'simple'
    app.cache = Cache(app)
    #carrega as variaveis de ambiente
    __load_env_file()
    #adiciona as rotas da aplicação
    add_routes(app)
    #adiciona na aplicação o método responsável tratar a mensagem de erro e retornar ao usuário
    add_error_handler(app)
    return app

#método que recebe as mensagens e retorna em um formato padrão para o usuário.
#Por padrão em todos os erros, seja por Except ou por lançamento de erro quando não passa em uma validação,
#E feito no seguinte padrão: TipoErro('Mensagem',número)
#exemplo: raise DataError("Can't handle team information, please check your payload", 400)

def add_error_handler(app):
    @app.errorhandler(Exception)
    @app.errorhandler(HTTPException)
    def handle_exception(e):
        response = None
        if isinstance(e, HTTPException):
            response = e.get_response()
            response.data = json.dumps({
                "code": e.code,
                "name": e.name,
                "description": e.description,
            })
        else:
            response = Response(status=e.args[1])
            response.data = json.dumps({
                "code": e.args[1],
                "name": "Error to process request",
                "description": e.args[0],
            })
        response.content_type = "application/json"
        return response

#index adicionado para informar a aplicação está no AR.
def add_routes(app):
    @app.route('/')
    def index():
        return render_template("app.html")

    """
    @apiDefine GetPokemons

    @apiSuccess {Object[]} pokemons List of all Pokemons
    @apiSuccess {String} pokemons.name  Name.
    @apiSuccess {Number} pokemons.id    Number of Pokemon.
    @apiSuccess {Number} pokemons.height Height.
    @apiSuccess {Number} pokemons.weight  Weight.
    @apiSuccess {Number} pokemons.xp  Base Experience.
    @apiSuccess {String} pokemons.image  image sprite URL.
    @apiSuccess {String[]} pokemons.types  Array of Pokemon Types.

    @apiSuccessExample Success-Response:
        HTTP/1.1 200 OK
    [
        {
            "HEIGHT": 0.7,
            "ID": 1,
            "IMAGE": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
            "NAME": "bulbasaur",
            "TYPES": [
                "poison",
                "grass"
            ],
            "WEIGHT": 6.9,
            "XP": 64
        }
    ]

    """

    """
    @apiDefine GetTeams

    @apiSuccess {Object[]} team List of all Teams
    @apiSuccess {Number} team.id    Team ID.
    @apiSuccess {String} team.team  Team Name.
    @apiSuccess {String} team.trainer  Trainer Name.    

    @apiSuccessExample Success-Response:
        HTTP/1.1 200 OK
    [
        {
            "ID": 1,
            "TRAINER": "Ash"            
            "TEAM": "Pallet Team"
        }
    ]

    """

    """
    @apiDefine EditTeams

    @apiSuccess {Object[]} team List of all Teams
    @apiSuccess {Number} success    Return if request was executed successfully

    @apiSuccessExample Success-Response:
        HTTP/1.1 200 OK
    [
        {
            "success": true
        }
    ]

    """

    """
    @apiDefine NotFoundError

    @apiError NotFound The endpoint was not found.

    @apiErrorExample NotFound:
        HTTP/1.1 404 Not Found
        {
            "code": 404,
            "name": "Not Found"
            "description": "The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again."
        }
    """

    """
    @apiDefine BadRequestError

    @apiError BadRequest Invalid require parameter.

    @apiErrorExample BadRequest:
        HTTP/1.1 400 Bad Request
        {
            "code": 400,
            "name":  "Error to process request",
            "description": "Invalid request, please check your payload."
        }
    """

    """
    @apiDefine InternalServerError

    @apiError InternalServerError Some internal error.

    @apiErrorExample InternalServerError:
        HTTP/1.1 500 Internal Server Error
        {
            "code": 500,
            "name":  "Error to process request",
            "description": "Error to update pokemons team [message]."
        }
    """

    """
    @api {get} /pokedex/ Get All Pokemons
    @apiSampleRequest off
    @apiName Get All Pokemons

    

    @apiGroup Pokedex
    @apiUse GetPokemons
    @apiUse NotFoundError
    @apiUse BadRequestError
    @apiUse InternalServerError

    """

    """

    @api {get} /pokedex/name/:name/ Get Pokemon by Name
    @apiSampleRequest off
    @apiParam {String} name The name of Pokemon

    @apiName Get All Pokemons By Name

    @apiGroup Pokedex

    @apiUse GetPokemons
    @apiUse NotFoundError
    @apiUse BadRequestError
    @apiUse InternalServerError

    """

    """

    @api {get} /pokedex/number/:number/ Get Pokemon by Number
    @apiSampleRequest off    
    @apiParam {Number} number Number of Pokemon

    @apiName Get All Pokemons By Number

    @apiGroup Pokedex

    @apiUse GetPokemons
    @apiUse NotFoundError
    @apiUse BadRequestError
    @apiUse InternalServerError

    """

    """

    @api {get} /pokedex/types/:firstType/:secondType Get Pokemon by Types
    @apiSampleRequest off    
    @apiParam {String} firstType Search all pokemons that contains that type
    @apiParam {String} [secondType] Search all pokemons that contains the two types

    @apiName Get All Pokemons By Types

    @apiGroup Pokedex

    @apiUse GetPokemons
    @apiUse NotFoundError
    @apiUse BadRequestError
    @apiUse InternalServerError
    """

    #metodo responsável por buscar as informações de pokemons
    @app.route('/pokedex/', methods=['GET'], strict_slashes=False)
    @app.route('/pokedex/name/<string:name>/', methods=['GET'], strict_slashes=False)
    @app.route('/pokedex/number/<int:number>/', methods=['GET'], strict_slashes=False)
    @app.route('/pokedex/types/<string:first_type>/', methods=['GET'], strict_slashes=False)
    @app.route('/pokedex/types/<string:first_type>/<string:second_type>/', methods=['GET'], strict_slashes=False)
    #como a base dificilmente (para não dizer nunca) terá atualização de dados
    #foi adicionado um cache no endpoint.
    @app.cache.cached(timeout=3600, query_string=True)
    #recebe os parametros de acordo com os campos preenchidos monta a consulta
    def get_pokemons(number=None, name=None, first_type=None, second_type=None):
    
        #lambda function para verificar se o campo foi informado
        #e se foi adiciona no dicionário que será usado para aplicar o filtro na consulta.
        def add_key_value(key, value, dictionay): return (
            value is not None) and dictionay.update({key: value})
        data = {}
        add_key_value("number", number, data)
        add_key_value("name", name, data)
        add_key_value("first_type", first_type, data)
        add_key_value("second_type", second_type, data)

        return jsonify(pokedex().get_pokemons(data))

    """

    @api {get} /teams/ Get Teams
    @apiSampleRequest off    
    @apiName Get All Teams

    @apiGroup Teams

    @apiUse GetTeams
    @apiUse NotFoundError
    @apiUse BadRequestError
    @apiUse InternalServerError
    """
    """

    @api {get} /team/:id  Get Team By Id
    @apiSampleRequest off    
    @apiParam {Number} id id of team

    @apiName Get Team By Id

    @apiGroup Teams

    @apiUse GetTeams
    @apiUse NotFoundError
    @apiUse BadRequestError
    @apiUse InternalServerError
    """
    """

    @api {delete} /team/:id Remove Pokemon Team
    @apiSampleRequest off    
    @apiParam {Number} id id of team

    @apiName Remove Pokemons Team

    @apiGroup Teams

    @apiUse EditTeams
    @apiUse NotFoundError
    @apiUse BadRequestError
    @apiUse InternalServerError
    """

    @app.route('/team/', methods=['GET'], strict_slashes=False)
    @app.route('/team/<int:id>/', methods=['GET'], strict_slashes=False)
    @app.route('/team/<int:id>/', methods=['DELETE'], strict_slashes=False)
    #metodo que busca ou remove o time de acordo com o tipo de requisição realizada.
    def get_teams(id=None):
        if request.method == 'DELETE':
            return jsonify(team().remove_team({"team": id}))
        return jsonify(team().get_teams({"id": id}))

    """

    @api {get} /team/:id/pokemons Get Pokemons By Team
    @apiSampleRequest off    
    @apiParam {Number} id of Team

    @apiName Get Pokemons Teams

    @apiGroup Teams

    @apiSuccess {Object[]} pokemons List of all Pokemons
    @apiSuccess {String} pokemons.name  Name.
    @apiSuccess {Number} pokemons.id    Number of Pokemon.
    @apiSuccess {Number} pokemons.height Height.
    @apiSuccess {Number} pokemons.weight  Weight.
    @apiSuccess {Number} pokemons.xp  Base Experience.
    @apiSuccess {String} pokemons.image  image sprite URL.
    @apiSuccess {String[]} pokemons.types  Array of Pokemon Types.

    @apiSuccessExample Success-Response:
    [
        {
            "HEIGHT": 0.7,
            "ID": 1,
            "IMAGE": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
            "NAME": "bulbasaur",
            "TYPES": [
            "poison",
            "grass"
            ],
            "WEIGHT": 6.9,
            "XP": 64
        },
        {
            "HEIGHT": 1.0,
            "ID": 2,
            "IMAGE": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
            "NAME": "ivysaur",
            "TYPES": [
            "poison",
            "grass"
            ],
            "WEIGHT": 13.0,
            "XP": 142
        },
        {
            "HEIGHT": 2.0,
            "ID": 3,
            "IMAGE": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
            "NAME": "venusaur",
            "TYPES": [
            "poison",
            "grass"
            ],
            "WEIGHT": 100.0,
            "XP": 236
        },
        {
            "HEIGHT": 0.6,
            "ID": 4,
            "IMAGE": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
            "NAME": "charmander",
            "TYPES": [
            "fire"
            ],
            "WEIGHT": 8.5,
            "XP": 62
        },
        {
            "HEIGHT": 1.1,
            "ID": 5,
            "IMAGE": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
            "NAME": "charmeleon",
            "TYPES": [
            "fire"
            ],
            "WEIGHT": 19.0,
            "XP": 142
        }
    ]


    @apiUse NotFoundError
    @apiUse BadRequestError
    @apiUse InternalServerError
    """
    @app.route('/team/<int:id>/pokemons', methods=['GET'], strict_slashes=False)
    #metodo que busca com base no id do time quais são os pokemons pertencentes a aquele time.
    def get_pokemon_teams(id=None):
        return jsonify(team().get_pokemons_team({"id_team": id}))

    """

    @api {post} /team/ Save Pokemons Team
    @apiSampleRequest off    
    @apiName Save Pokemons Teams

    @apiGroup Teams

    @apiParam {String{5..}} team name of team
    @apiParam {String} trainer name of trainer
    @apiParam {Number[]} pokemons Pokemons ID

    @apiParamExample {json} Request-Example:
    {
        "team": "Pallet Team",
        "trainer": "Ash",
            "pokemons": [
                25,7,6,12,17,1
            ]
    }

    @apiUse EditTeams
    @apiUse NotFoundError
    @apiUse BadRequestError
    @apiUse InternalServerError
    """

    """

    @api {put} /team/ Update Pokemons Team
    @apiSampleRequest off    
    @apiName Update Pokemons Team

    @apiGroup Teams

    @apiParam {String} team name of team
    @apiParam {String} trainer name of trainer
    @apiParam {Number[]} pokemons Pokemons ID

    @apiParamExample {json} Request-Example:
    {
        "team": "Pallet Team",
        "trainer": "Ash",
            "pokemons": [
                25,7,6,12,17,1
            ]
    }

    @apiUse EditTeams
    @apiUse NotFoundError
    @apiUse BadRequestError
    @apiUse InternalServerError
    """
    @app.route('/team/', methods=['POST', 'PUT'], strict_slashes=False)
    #metodo que atualiza ou salva, de acordo com o metodo informado e se o id foi informado
    def save_teams():
        #verifica se o payload é um JSON, para evitar processamento desnecessário.
        if request.is_json:
            json_content = request.get_json()
            #lambda function que verifica de o campo key existe no dicionário dict
            #se sim retorna o valor, se não retorna None
            def get_value_if_exists(key, dict): 
                if (key in dict.keys()):
                    return dict[key]
                return None

            data = {}
            id_team = get_value_if_exists('id', json_content)
            obj_team = team()

            #valida no payload se:
            #é post e id não foi informado
            #é put e id foi informado
            if (request.method == 'POST' and id_team is None) or (request.method == 'PUT' and id_team is not None):
                data = {
                    'id': id_team,
                    "team": get_value_if_exists('team', json_content),
                    "trainer": get_value_if_exists('trainer', json_content),
                    "pokemons": get_value_if_exists('pokemons', json_content)
                }
                return jsonify(obj_team.save_pokemons_team(data))
        raise DataError("Invalid request, please check your payload.", 400)

#verifica se o módulo em execução e o principal ou não.
#se sim retorna a aplicação com host e porta parametrizadas no arquivo .env
#Obs.: a referencia da pasta das extensões é feito dinâmicamente
#pois em aplicação só reconhece os arquivos em ext
#e quando em teste só reconhece em .ext
#infelizmente não houve tempo hábil para melhor análise.
if __name__ == '__main__':
    from ext import pokedex
    from ext import team
    create_app().run(host=os.getenv('FLASK_HOST'), port=os.getenv('FLASK_PORT'))
else:
    from .ext import pokedex
    from .ext import team
