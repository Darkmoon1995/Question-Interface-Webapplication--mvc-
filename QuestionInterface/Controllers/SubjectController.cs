using Microsoft.AspNetCore.Mvc;

namespace QuestionInterface.Controllers
{
    public class SubjectController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
