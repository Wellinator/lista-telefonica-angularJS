//With "factory" method 
angular.module("listaTelefonica").factory("contatosAPI", function ($http, config) {
   const _getContatos = function () {
       return $http.get(config.baseUrl + "/contatos");
   }
   const _getContato = function (id) {
       return $http.get(config.baseUrl + "/contatos/" + id);
   }
   const _saveContatos = function (contato) {
       return $http.post(config.baseUrl + "/contatos", {...contato, cor: "Orange", data: new Date()});
   }

   return {
       getContatos: _getContatos,
       getContato: _getContato,
       saveContatos: _saveContatos
   }
});