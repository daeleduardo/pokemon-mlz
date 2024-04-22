define({ "api": [
  {
    "type": "get",
    "url": "/pokedex/",
    "title": "Get All Pokemons",
    "name": "Get_All_Pokemons",
    "group": "Pokedex",
    "version": "0.0.0",
    "filename": "/usr/src/app/pokemon_mlz/app.py",
    "groupTitle": "Pokedex",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "pokemons",
            "description": "<p>List of all Pokemons</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pokemons.name",
            "description": "<p>Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pokemons.id",
            "description": "<p>Number of Pokemon.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pokemons.height",
            "description": "<p>Height.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pokemons.weight",
            "description": "<p>Weight.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pokemons.xp",
            "description": "<p>Base Experience.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pokemons.image",
            "description": "<p>image sprite URL.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "pokemons.types",
            "description": "<p>Array of Pokemon Types.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n[\n    {\n        \"HEIGHT\": 0.7,\n        \"ID\": 1,\n        \"IMAGE\": \"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png\",\n        \"NAME\": \"bulbasaur\",\n        \"TYPES\": [\n            \"poison\",\n            \"grass\"\n        ],\n        \"WEIGHT\": 6.9,\n        \"XP\": 64\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The endpoint was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid require parameter.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Some internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"code\": 404,\n    \"name\": \"Not Found\"\n    \"description\": \"The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"code\": 400,\n    \"name\":  \"Error to process request\",\n    \"description\": \"Invalid request, please check your payload.\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"code\": 500,\n    \"name\":  \"Error to process request\",\n    \"description\": \"Error to update pokemons team [message].\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/pokedex/name/:name/",
    "title": "Get Pokemon by Name",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of Pokemon</p>"
          }
        ]
      }
    },
    "name": "Get_All_Pokemons_By_Name",
    "group": "Pokedex",
    "version": "0.0.0",
    "filename": "/usr/src/app/pokemon_mlz/app.py",
    "groupTitle": "Pokedex",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "pokemons",
            "description": "<p>List of all Pokemons</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pokemons.name",
            "description": "<p>Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pokemons.id",
            "description": "<p>Number of Pokemon.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pokemons.height",
            "description": "<p>Height.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pokemons.weight",
            "description": "<p>Weight.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pokemons.xp",
            "description": "<p>Base Experience.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pokemons.image",
            "description": "<p>image sprite URL.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "pokemons.types",
            "description": "<p>Array of Pokemon Types.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n[\n    {\n        \"HEIGHT\": 0.7,\n        \"ID\": 1,\n        \"IMAGE\": \"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png\",\n        \"NAME\": \"bulbasaur\",\n        \"TYPES\": [\n            \"poison\",\n            \"grass\"\n        ],\n        \"WEIGHT\": 6.9,\n        \"XP\": 64\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The endpoint was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid require parameter.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Some internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"code\": 404,\n    \"name\": \"Not Found\"\n    \"description\": \"The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"code\": 400,\n    \"name\":  \"Error to process request\",\n    \"description\": \"Invalid request, please check your payload.\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"code\": 500,\n    \"name\":  \"Error to process request\",\n    \"description\": \"Error to update pokemons team [message].\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/pokedex/number/:number/",
    "title": "Get Pokemon by Number",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "number",
            "description": "<p>Number of Pokemon</p>"
          }
        ]
      }
    },
    "name": "Get_All_Pokemons_By_Number",
    "group": "Pokedex",
    "version": "0.0.0",
    "filename": "/usr/src/app/pokemon_mlz/app.py",
    "groupTitle": "Pokedex",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "pokemons",
            "description": "<p>List of all Pokemons</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pokemons.name",
            "description": "<p>Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pokemons.id",
            "description": "<p>Number of Pokemon.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pokemons.height",
            "description": "<p>Height.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pokemons.weight",
            "description": "<p>Weight.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pokemons.xp",
            "description": "<p>Base Experience.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pokemons.image",
            "description": "<p>image sprite URL.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "pokemons.types",
            "description": "<p>Array of Pokemon Types.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n[\n    {\n        \"HEIGHT\": 0.7,\n        \"ID\": 1,\n        \"IMAGE\": \"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png\",\n        \"NAME\": \"bulbasaur\",\n        \"TYPES\": [\n            \"poison\",\n            \"grass\"\n        ],\n        \"WEIGHT\": 6.9,\n        \"XP\": 64\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The endpoint was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid require parameter.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Some internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"code\": 404,\n    \"name\": \"Not Found\"\n    \"description\": \"The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"code\": 400,\n    \"name\":  \"Error to process request\",\n    \"description\": \"Invalid request, please check your payload.\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"code\": 500,\n    \"name\":  \"Error to process request\",\n    \"description\": \"Error to update pokemons team [message].\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/pokedex/types/:firstType/:secondType",
    "title": "Get Pokemon by Types",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstType",
            "description": "<p>Search all pokemons that contains that type</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "secondType",
            "description": "<p>Search all pokemons that contains the two types</p>"
          }
        ]
      }
    },
    "name": "Get_All_Pokemons_By_Types",
    "group": "Pokedex",
    "version": "0.0.0",
    "filename": "/usr/src/app/pokemon_mlz/app.py",
    "groupTitle": "Pokedex",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "pokemons",
            "description": "<p>List of all Pokemons</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pokemons.name",
            "description": "<p>Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pokemons.id",
            "description": "<p>Number of Pokemon.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pokemons.height",
            "description": "<p>Height.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pokemons.weight",
            "description": "<p>Weight.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pokemons.xp",
            "description": "<p>Base Experience.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pokemons.image",
            "description": "<p>image sprite URL.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "pokemons.types",
            "description": "<p>Array of Pokemon Types.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n[\n    {\n        \"HEIGHT\": 0.7,\n        \"ID\": 1,\n        \"IMAGE\": \"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png\",\n        \"NAME\": \"bulbasaur\",\n        \"TYPES\": [\n            \"poison\",\n            \"grass\"\n        ],\n        \"WEIGHT\": 6.9,\n        \"XP\": 64\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The endpoint was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid require parameter.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Some internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"code\": 404,\n    \"name\": \"Not Found\"\n    \"description\": \"The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"code\": 400,\n    \"name\":  \"Error to process request\",\n    \"description\": \"Invalid request, please check your payload.\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"code\": 500,\n    \"name\":  \"Error to process request\",\n    \"description\": \"Error to update pokemons team [message].\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/teams/",
    "title": "Get Teams",
    "name": "Get_All_Teams",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "/usr/src/app/pokemon_mlz/app.py",
    "groupTitle": "Teams",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "team",
            "description": "<p>List of all Teams</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "team.id",
            "description": "<p>Team ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "team.team",
            "description": "<p>Team Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "team.trainer",
            "description": "<p>Trainer Name.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n[\n    {\n        \"ID\": 1,\n        \"TRAINER\": \"Ash\"            \n        \"TEAM\": \"Pallet Team\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The endpoint was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid require parameter.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Some internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"code\": 404,\n    \"name\": \"Not Found\"\n    \"description\": \"The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"code\": 400,\n    \"name\":  \"Error to process request\",\n    \"description\": \"Invalid request, please check your payload.\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"code\": 500,\n    \"name\":  \"Error to process request\",\n    \"description\": \"Error to update pokemons team [message].\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/team/:id/pokemons",
    "title": "Get Pokemons By Team",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>of Team</p>"
          }
        ]
      }
    },
    "name": "Get_Pokemons_Teams",
    "group": "Teams",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "pokemons",
            "description": "<p>List of all Pokemons</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pokemons.name",
            "description": "<p>Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pokemons.id",
            "description": "<p>Number of Pokemon.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pokemons.height",
            "description": "<p>Height.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pokemons.weight",
            "description": "<p>Weight.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pokemons.xp",
            "description": "<p>Base Experience.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pokemons.image",
            "description": "<p>image sprite URL.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "pokemons.types",
            "description": "<p>Array of Pokemon Types.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n    {\n        \"HEIGHT\": 0.7,\n        \"ID\": 1,\n        \"IMAGE\": \"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png\",\n        \"NAME\": \"bulbasaur\",\n        \"TYPES\": [\n        \"poison\",\n        \"grass\"\n        ],\n        \"WEIGHT\": 6.9,\n        \"XP\": 64\n    },\n    {\n        \"HEIGHT\": 1.0,\n        \"ID\": 2,\n        \"IMAGE\": \"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png\",\n        \"NAME\": \"ivysaur\",\n        \"TYPES\": [\n        \"poison\",\n        \"grass\"\n        ],\n        \"WEIGHT\": 13.0,\n        \"XP\": 142\n    },\n    {\n        \"HEIGHT\": 2.0,\n        \"ID\": 3,\n        \"IMAGE\": \"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png\",\n        \"NAME\": \"venusaur\",\n        \"TYPES\": [\n        \"poison\",\n        \"grass\"\n        ],\n        \"WEIGHT\": 100.0,\n        \"XP\": 236\n    },\n    {\n        \"HEIGHT\": 0.6,\n        \"ID\": 4,\n        \"IMAGE\": \"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png\",\n        \"NAME\": \"charmander\",\n        \"TYPES\": [\n        \"fire\"\n        ],\n        \"WEIGHT\": 8.5,\n        \"XP\": 62\n    },\n    {\n        \"HEIGHT\": 1.1,\n        \"ID\": 5,\n        \"IMAGE\": \"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png\",\n        \"NAME\": \"charmeleon\",\n        \"TYPES\": [\n        \"fire\"\n        ],\n        \"WEIGHT\": 19.0,\n        \"XP\": 142\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/usr/src/app/pokemon_mlz/app.py",
    "groupTitle": "Teams",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The endpoint was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid require parameter.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Some internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"code\": 404,\n    \"name\": \"Not Found\"\n    \"description\": \"The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"code\": 400,\n    \"name\":  \"Error to process request\",\n    \"description\": \"Invalid request, please check your payload.\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"code\": 500,\n    \"name\":  \"Error to process request\",\n    \"description\": \"Error to update pokemons team [message].\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/team/:id",
    "title": "Get Team By Id",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id of team</p>"
          }
        ]
      }
    },
    "name": "Get_Team_By_Id",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "/usr/src/app/pokemon_mlz/app.py",
    "groupTitle": "Teams",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "team",
            "description": "<p>List of all Teams</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "team.id",
            "description": "<p>Team ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "team.team",
            "description": "<p>Team Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "team.trainer",
            "description": "<p>Trainer Name.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n[\n    {\n        \"ID\": 1,\n        \"TRAINER\": \"Ash\"            \n        \"TEAM\": \"Pallet Team\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The endpoint was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid require parameter.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Some internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"code\": 404,\n    \"name\": \"Not Found\"\n    \"description\": \"The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"code\": 400,\n    \"name\":  \"Error to process request\",\n    \"description\": \"Invalid request, please check your payload.\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"code\": 500,\n    \"name\":  \"Error to process request\",\n    \"description\": \"Error to update pokemons team [message].\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/team/:id",
    "title": "Remove Pokemon Team",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id of team</p>"
          }
        ]
      }
    },
    "name": "Remove_Pokemons_Team",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "/usr/src/app/pokemon_mlz/app.py",
    "groupTitle": "Teams",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "team",
            "description": "<p>List of all Teams</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "success",
            "description": "<p>Return if request was executed successfully</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n[\n    {\n        \"success\": true\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The endpoint was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid require parameter.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Some internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"code\": 404,\n    \"name\": \"Not Found\"\n    \"description\": \"The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"code\": 400,\n    \"name\":  \"Error to process request\",\n    \"description\": \"Invalid request, please check your payload.\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"code\": 500,\n    \"name\":  \"Error to process request\",\n    \"description\": \"Error to update pokemons team [message].\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/team/",
    "title": "Save Pokemons Team",
    "name": "Save_Pokemons_Teams",
    "group": "Teams",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "5..",
            "optional": false,
            "field": "team",
            "description": "<p>name of team</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "trainer",
            "description": "<p>name of trainer</p>"
          },
          {
            "group": "Parameter",
            "type": "Number[]",
            "optional": false,
            "field": "pokemons",
            "description": "<p>Pokemons ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"team\": \"Pallet Team\",\n    \"trainer\": \"Ash\",\n        \"pokemons\": [\n            25,7,6,12,17,1\n        ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/usr/src/app/pokemon_mlz/app.py",
    "groupTitle": "Teams",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "team",
            "description": "<p>List of all Teams</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "success",
            "description": "<p>Return if request was executed successfully</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n[\n    {\n        \"success\": true\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The endpoint was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid require parameter.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Some internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"code\": 404,\n    \"name\": \"Not Found\"\n    \"description\": \"The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"code\": 400,\n    \"name\":  \"Error to process request\",\n    \"description\": \"Invalid request, please check your payload.\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"code\": 500,\n    \"name\":  \"Error to process request\",\n    \"description\": \"Error to update pokemons team [message].\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/team/",
    "title": "Update Pokemons Team",
    "name": "Update_Pokemons_Team",
    "group": "Teams",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "team",
            "description": "<p>name of team</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "trainer",
            "description": "<p>name of trainer</p>"
          },
          {
            "group": "Parameter",
            "type": "Number[]",
            "optional": false,
            "field": "pokemons",
            "description": "<p>Pokemons ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"team\": \"Pallet Team\",\n    \"trainer\": \"Ash\",\n        \"pokemons\": [\n            25,7,6,12,17,1\n        ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/usr/src/app/pokemon_mlz/app.py",
    "groupTitle": "Teams",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "team",
            "description": "<p>List of all Teams</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "success",
            "description": "<p>Return if request was executed successfully</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n[\n    {\n        \"success\": true\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The endpoint was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid require parameter.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Some internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"code\": 404,\n    \"name\": \"Not Found\"\n    \"description\": \"The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"code\": 400,\n    \"name\":  \"Error to process request\",\n    \"description\": \"Invalid request, please check your payload.\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"code\": 500,\n    \"name\":  \"Error to process request\",\n    \"description\": \"Error to update pokemons team [message].\"\n}",
          "type": "json"
        }
      ]
    }
  }
] });
