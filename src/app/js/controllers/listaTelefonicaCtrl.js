angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, contatos, operadoras, serialGenerator){
    $scope.app = "Lista Telefonica";
    $scope.contatos = contatos.data;
    $scope.operadoras = operadoras.data;

    const generateSerial = function (contatos) {
        contatos.forEach(function (item) {
            item.serial = serialGenerator.generate();
        });
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

    generateSerial($scope.contatos);
});