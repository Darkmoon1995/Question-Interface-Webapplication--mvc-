﻿using System;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QuestionInterface.Models;

namespace QuestionInterface.Controllers
{
    public class QuestionsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult SaveData([FromBody] WorksheetModel model)
        {
            try
            {
                model.WorksheetId = new Random().Next(100000, 999999);  // Generate a unique WorksheetId
                string json = JsonConvert.SerializeObject(model, Formatting.Indented);
                string fileName = $"{model.WorksheetId}.json";
                string directoryPath = @"D:\#C\Web APlication mvvm\QuestionInterface\QuestionInterfaceSolution\QuestionInterface\wwwroot\js\JsonFormatWorkSheets";

                // Ensure the directory exists
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }

                string filePath = Path.Combine(directoryPath, fileName);

                System.IO.File.WriteAllText(filePath, json);

                return Json(new { success = true, worksheetId = model.WorksheetId });
            }
            catch (Exception ex)
            {
                // Log the exception and return a failure response
                Console.WriteLine("Error: " + ex.Message);
                return Json(new { success = false, message = ex.Message });
            }
        }
    }
}
