angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, $http, contatosAPI){
    $scope.app = "Lista Telefonica";
    $scope.contatos = [];
    $scope.operadoras = [];

    const carregarContatos = function (params) {
        contatosAPI.getContatos().success(
            data => $scope.contatos = data
        ).error(
            (data, status) => {
                $scope.message = "Houve um problema na requisição: ERROR " + status;
        })
    }

    const carregarOperadoras = function (params) {
        $http.get("http://localhost:3001/operadoras").success(
            data => $scope.operadoras = data
        )
    }

    $scope.adicionarContato = function(contato) {
        contatosAPI.saveContatos(contato)
        .success(
            (data) => {
                delete $scope.contato;
                $scope.contatoForm.$setPristine();
                carregarContatos();
        })
        .error(
            (data) => {
                $scope.message = "Houve um problema na requisição: " + data;
                console.log($scope.message)
        })
    };
    $scope.apagarContatos = function (contatos) {
        $scope.contatos = contatos.filter( contato => {
            if ( !contato.selecionado) return contato;
        });
    }
    $scope.isContatoSelecionado = function(contatos){
        return contatos.some( contato => {
            return contato.selecionado;
        });
    };
    $scope.ordenarPor = function(campo) {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };

    carregarContatos();
    carregarOperadoras();

});