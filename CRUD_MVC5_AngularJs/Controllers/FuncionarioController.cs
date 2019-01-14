using CRUD_MVC5_AngularJs.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace CRUD_MVC5_AngularJs.Controllers
{
    public class FuncionarioController : Controller
    {
        #region Método Listar Funcionário - READ

        // GET Funcionario/GetFuncionario
        public JsonResult GetFuncionario()
        {
            using(var BaseDeDados = new CRUD_MVC5Entities())
            {
                List<Funcionario> listarFuncionarios = BaseDeDados.Funcionarios.ToList();

                return Json(listarFuncionarios, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

        #region Método Adicionar Funcionário - CREATE

        // POST Funcionario/AdicionarFuncionario
        [HttpPost]
        public JsonResult AdicionarFuncionario(Funcionario funcionario)
        {
            if(funcionario != null)
            {
                using(var BaseDeDados = new CRUD_MVC5Entities())
                {
                    BaseDeDados.Funcionarios.Add(funcionario);
                    BaseDeDados.SaveChanges();

                    return Json(new { success = true });
                }
            }

            return Json(new { success = false });
        }

        #endregion

        #region Método Atualizar Funcionário - UPDATE

        // POST Funcionario/AtualizarFuncionario
        [HttpPost]
        public JsonResult AtualizarFuncionario(Funcionario funcionario)
        {
            using(var BaseDeDados = new CRUD_MVC5Entities())
            {
                var funcionarioAtualizado = BaseDeDados.Funcionarios.Find(funcionario.Id_Funcionario);

                if(funcionarioAtualizado == null)
                {
                    return Json(new { success = true });
                }
                else
                {
                    funcionarioAtualizado.Nome = funcionario.Nome;
                    funcionarioAtualizado.Email = funcionario.Email;
                    funcionarioAtualizado.Cargo = funcionario.Cargo;
                    funcionarioAtualizado.Departamento = funcionario.Departamento;

                    BaseDeDados.SaveChanges();

                    return Json(new { success = true });
                }
            }
        }

        #endregion

        #region Método Excluir Funcionário - DELETE

        // POST Funcionario/ExcluirFuncionario
        [HttpPost]
        public JsonResult ExcluirFuncionario(int? id)
        {
            using(var BaseDeDados = new CRUD_MVC5Entities())
            {
                var funcionario_excluido = BaseDeDados.Funcionarios.Find(id);

                if (funcionario_excluido == null)
                {
                    return Json(new { success = false });
                }

                BaseDeDados.Funcionarios.Remove(funcionario_excluido);
                BaseDeDados.SaveChanges();

                return Json(new { success = true });
            }
        }

        #endregion
    }
}