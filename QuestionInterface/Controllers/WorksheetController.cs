using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QuestionInterface.Models;

namespace QuestionInterface.Controllers
{
    public class WorksheetController : Controller
    {
        private readonly string _jsonDirectoryPath = @"D:\#C\Web APlication mvvm\QuestionInterface\QuestionInterfaceSolution\QuestionInterface\wwwroot\js\JsonFormatWorkSheets";

        public IActionResult List()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetWorksheets()
        {
            try
            {
                var worksheetFiles = Directory.GetFiles(_jsonDirectoryPath, "*.json");
                var worksheets = new List<WorksheetModel>();

                foreach (var file in worksheetFiles)
                {
                    var json = System.IO.File.ReadAllText(file);
                    var worksheet = JsonConvert.DeserializeObject<WorksheetModel>(json);
                    worksheets.Add(worksheet);
                }

                return Json(worksheets);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                return Json(new List<WorksheetModel>());
            }
        }

        public IActionResult Details(int id)
        {
            try
            {
                string filePath = Path.Combine(_jsonDirectoryPath, $"{id}.json");

                if (System.IO.File.Exists(filePath))
                {
                    var json = System.IO.File.ReadAllText(filePath);
                    var worksheet = JsonConvert.DeserializeObject<WorksheetModel>(json);
                    return View(worksheet);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                return NotFound();
            }
        }
    }
}
