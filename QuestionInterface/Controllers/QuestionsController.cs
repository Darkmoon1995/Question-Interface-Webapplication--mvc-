using System;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QuestionInterface.Models;

namespace QuestionInterface.Controllers
{
    public class QuestionsController : Controller
    {
        private readonly string _maxIdFilePath = @"D:\#C\Web APlication mvvm\QuestionInterface\QuestionInterfaceSolution\QuestionInterface\wwwroot\js\JsonFormatWorkSheets\maxId.txt";

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult SaveData([FromBody] WorksheetModel model)
        {
            try
            {
                int newWorksheetId = GetNextWorksheetId();
                model.WorksheetId = newWorksheetId;

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

        private int GetNextWorksheetId()
        {
            int currentMaxId = 0;

            // Read the current maximum ID from the file
            if (System.IO.File.Exists(_maxIdFilePath))
            {
                string currentMaxIdString = System.IO.File.ReadAllText(_maxIdFilePath);
                if (int.TryParse(currentMaxIdString, out int parsedMaxId))
                {
                    currentMaxId = parsedMaxId;
                }
            }

            // Increment the current maximum ID
            int newMaxId = currentMaxId + 1;

            // Write the new maximum ID back to the file
            System.IO.File.WriteAllText(_maxIdFilePath, newMaxId.ToString());

            return newMaxId;
        }
    }
}
