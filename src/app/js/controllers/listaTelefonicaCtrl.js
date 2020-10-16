angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, contatosAPI, operadorasAPI, serialGenerator){
    $scope.app = "Lista Telefonica";
    $scope.contatos = [];
    $scope.operadoras = [];
    $scope.contato = {
        data: 11187774000000
    };

    const carregarContatos = function () {
        contatosAPI.getContatos()
        .success(
            data => $scope.contatos = data
        ).error(
            (data, status) => {
                $scope.error = "Não foi possível carregar os dados";
        })
    }

    const carregarOperadoras = function () {
        operadorasAPI.getOperadoras().success(
            data => $scope.operadoras = data
        )
    }

    $scope.adicionarContato = function(contato) {
        
        contato.serial = serialGenerator.generate();
        contatosAPI.saveContatos(contato)
        .success(
            (data) => {
                delete $scope.contato;
                $scope.contatoForm.$setPristine();
                carregarContatos();
        })
        .error(
            (data) => {
                $scope.error = "Erro ao carregar operadoras";
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