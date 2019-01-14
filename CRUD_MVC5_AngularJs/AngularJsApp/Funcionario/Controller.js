// Controller - Funcionário
funcionarioApp.controller('funcionarioCtrl', function ($scope, funcionarioService) {

    // Todos os dados do Funcionário são carregados quando a página for recarregada.
    carregarFuncionarios();

    // Método responsável por carregar todas as propriedades do funcionário.
    function carregarFuncionarios() {

        var listarFuncionarios = funcionarioService.getTodosFuncionarios();

        listarFuncionarios.then(function (d) {

            $scope.Funcionarios = d.data;
        },

            function () {
                alert("Ocorreu um erro ao tentar listar todos os funcionários!");
            });
    }

    // Método responsável por adicionar cada propriedade de um novo funcionário.
    $scope.adicionarFuncionario = function () {

        var funcionario = {
            Id_Funcionario: $scope.idFuncionario,
            Nome: $scope.nome,
            Email: $scope.email,
            Departamento: $scope.departamento,
            Cargo: $scope.cargo,
        };

        var adicionarInformacoes = funcionarioService.adicionarFuncionario(funcionario);

        adicionarInformacoes.then(function (dados) {

            if (dados.data.success === true) {
                carregarFuncionarios();
                alert("Funcionário cadastrado com sucesso!");
                $scope.limparCampos();
            } else {
                alert("Funcionário não foi cadastrado!");
            }
        },
            function () {
                alert("Erro ocorrido ao tentar cadastrar um novo funcionário!");
            });
    }

    // Método responsável por resgatar as propriedades do funcionário através do Id.
    $scope.atualizarFuncionarioPorId = function (funcionario) {

        $scope.idAtualizado = funcionario.Id_Funcionario;
        $scope.nomeAtualizado = funcionario.Nome;
        $scope.emailAtualizado = funcionario.Email;
        $scope.departamentoAtualizado = funcionario.Departamento;
        $scope.cargoAtualizado = funcionario.Cargo;
    }

    // Método responsável por atualizar as propriedades do funcionário.
    $scope.atualizarFuncionario = function (funcionario) {

        var funcionario = {
            Id_Funcionario: $scope.idAtualizado,
            Nome: $scope.nomeAtualizado,
            Email: $scope.emailAtualizado,
            Departamento: $scope.departamentoAtualizado,
            Cargo: $scope.cargoAtualizado,
        };

        var atualizarInformacoes = funcionarioService.atualizarFuncionario(funcionario);

        atualizarInformacoes.then(function (dados) {
            if (dados.data.success === true) {
                carregarFuncionarios();
                alert("Funcionário atualizado com sucesso!");
                $scope.limparCamposAposAtualizacao();
            } else {
                alert("Funcionário não foi atualizado!");
            }
        },
            function () {
                alert("Erro ocorrido ao tentar atualizar o funcionário!");
            });
    }

    // Método responsável por resgatar as propriedades do funcionário através do Id.
    $scope.excluirFuncionarioPorId = function (funcionario) {

        $scope.idAtualizado = funcionario.Id_Funcionario;
        $scope.nomeAtualizado = funcionario.Nome;
    }

    // Método responsável por excluir o funcionário através do Id.
    $scope.excluirFuncionario = function (idAtualizado) {

        var excluirInformacoes = funcionarioService.excluirFuncionario($scope.idAtualizado);

        excluirInformacoes.then(function (dados) {
            if (dados.data.success === true) {
                carregarFuncionarios();
                alert("Funcionário excluído com sucesso!");
            } else {
                alert("Funcionário não foi excluído!");
            }
        },
            function () {
                alert("Erro ocorrido ao tentar excluir o funcionário!");
            });
    }


    // Método para limpar os campos após inserção dos dados no banco de dados.
    $scope.limparCampos = function () {
        $scope.idFuncionario = '';
        $scope.nome = '';
        $scope.email = '';
        $scope.departamento = '';
        $scope.cargo = '';
    }

    // Método para limpar os campos após atualização dos dados no banco de dados.
    $scope.limparCamposAposAtualizacao = function () {
        $scope.idAtualizado = '';
        $scope.nomeAtualizado = '';
        $scope.emailAtualizado = '';
        $scope.departamentoAtualizado = '';
        $scope.cargoAtualizado = '';
    }
});