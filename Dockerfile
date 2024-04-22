FROM python:3-alpine

ENV ENV="/root/.ashrc"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


RUN apk update && apk upgrade
RUN /usr/local/bin/python -m pip install --upgrade pip
RUN apk add make nano nodejs-current npm
RUN npm install apidoc -g

COPY . /usr/src/app
RUN pip install --no-cache-dir -r requirements.txt



# Expose the Flask port
#EXPOSE 5000

CMD [ "python", "/usr/src/app/pokemon_mlz/app.py" ]