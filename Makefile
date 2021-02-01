FLASK_APP=pokemon_meliuz/app.py
FLASK_ENV=development
FLASK_HOST=0.0.0.0
FLASK_PORT=5002
PYTHONPATH=venv
APIDOC_PORT=49150

CONTAINER_NAME=pokemon-meliuz

clean:
	@find ./ -name '*.pyc' -exec rm -f {} \;
	@find ./ -name 'Thumbs.db' -exec rm -f {} \;
	@find ./ -name '*~' -exec rm -f {} \;
	rm -rf .cache
	rm -rf build
	rm -rf dist
	rm -rf *.egg-info
	rm -rf htmlcov
	rm -rf .tox/
	rm -rf docs/_build

install:
	PYTHONPATH=venv
	pip install -r requirements.txt;
    
test: run
	rm -rf databases/test.db
	export FLASK_ENV=test
	echo "FLASK_ENV=test"  > .env
	#FLASK_ENV=test pytest tests/ -v --cov=pokemon_meliuz
	docker exec $(CONTAINER_NAME) pytest /usr/src/app/tests/ -v --cov=pokemon_meliuz

build: env
	#docker build -t $(CONTAINER_NAME):latest ./docker-images/pokemon-meliuz
	docker-compose up -d --build

env:
	export FLASK_APP
	export FLASK_ENV
	export FLASK_HOST
	export FLASK_PORT
	export PYTHONPATH
	export APIDOC_PORT
	echo "FLASK_APP=$(FLASK_APP)" > .env
	echo "FLASK_ENV=$(FLASK_ENV)"  >> .env
	echo "FLASK_HOST=$(FLASK_HOST)" >> .env
	echo "FLASK_PORT=$(FLASK_PORT)" >> .env
	echo "PYTHONPATH=$(PYTHONPATH)" >> .env
	echo "APIDOC_PORT=$(APIDOC_PORT)" >> .env	

run: env
	#docker run -d --rm -p 80:$(FLASK_PORT) --name $(CONTAINER_NAME) $(CONTAINER_NAME)
	docker-compose up -d
	
shell:
	docker exec -it $(CONTAINER_NAME) sh

stop:
	docker-compose down

apidocjs: stop run
	docker exec -d $(CONTAINER_NAME) rm -rf /usr/src/app/docs/apidoc/
	docker exec -d $(CONTAINER_NAME) apidoc -i /usr/src/app/pokemon_meliuz -o /usr/src/app/docs/apidoc/
	sleep 3
	docker exec -d $(CONTAINER_NAME) python3 /usr/src/app/docs/app.py