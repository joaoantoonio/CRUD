funcionarioApp.service('funcionarioService', function ($http) {

    // Método responsável por listar todos os funcionários: READ
    this.getTodosFuncionarios = function () {
        return $http.get('/Funcionario/GetFuncionario');
    }

    // Método responsável por adicionar um funcionário: CREATE
    this.adicionarFuncionario = function (funcionario) {
        var request = $http({
            method: 'post',
            url: '/Funcionario/AdicionarFuncionario',
            data: funcionario
        });

        return request;
    }

    // Método responsável por atualizar um funcionário pelo Id: UPDATE
    this.atualizarFuncionario = function (funcionario) {
        var request = $http({
            method: 'post',
            url: '/Funcionario/AtualizarFuncionario',
            data: funcionario
        });

        return request;
    }

    // Método responsável por excluir um funcionário pelo Id: DELETE
    this.excluirFuncionario = function (idAtualizado) {
        return $http.post('/Funcionario/ExcluirFuncionario/' + idAtualizado);
    }
})