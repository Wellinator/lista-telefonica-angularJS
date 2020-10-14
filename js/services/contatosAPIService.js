//With "factory" method 
angular.module("listaTelefonica").factory("contatosAPI", function ($http) {
   const _getContatos = function () {
       return $http.get("http://localhost:3001/contatos");
   }
   const _saveContatos = function (contato) {
       return $http.post("http://localhost:3001/contatos", {...contato, cor: "Orange", data: new Date()});
   }

   return {
       getContatos: _getContatos,
       saveContatos: _saveContatos
   }
});