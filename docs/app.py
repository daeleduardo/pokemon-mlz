import http.server
import socketserver
import os

#Inicia um servidor http simples para exibir a documentação
class MyHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    #Se a requisição for para GET para a raiz carrega a página index.html
    def do_GET(self):
        if self.path == "/":
            self.path = "index.html"
            print(self.path)
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

#Lê o arquivo .env e o aplica nas variáveis de ambiente da aplicação
with open(os.getcwd()+'/.env', 'r') as fh:
    vars_dict = dict(
        tuple(line.rstrip("\n").split('='))
        for line in fh.readlines() if not line.startswith('#')
    )
#A aplicação inicia em ./docs, muda o diretŕoio da aplicação para ter acesso a documentação da API.
os.chdir(os.getcwd()+"/docs/apidoc/")
os.environ.update(vars_dict)
#busca o número da porta que será usada pela aplicação
PORT = int(os.getenv('APIDOC_PORT'))

#seta a classe criada a cima como a que irá manipular as requisições http
handler_object = MyHttpRequestHandler
#instancia o servidor
apidoc_server = socketserver.TCPServer(("", PORT), handler_object)
#Inicia o servidor
apidoc_server.serve_forever()
