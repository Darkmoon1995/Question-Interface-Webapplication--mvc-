﻿using Microsoft.AspNetCore.Mvc;

namespace QuestionInterface.Controllers
{
    public class QuestionsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
