using System.Collections.Generic;

namespace QuestionInterface.Models
{
    public class WorksheetModel
    {
        public int WorksheetId { get; set; }
        public int SkillId { get; set; }
        public int Number { get; set; }
        public int Level { get; set; }
        public Title Title { get; set; }
        public FinalMessage FinalMessage { get; set; }
        public string WorksheetType { get; set; }
        public List<Question> Qus { get; set; }
    }

    public class Title
    {
        public string Text { get; set; }
        public Config Config { get; set; }
    }

    public class FinalMessage
    {
        public string Text { get; set; }
        public Config Config { get; set; }
    }

    public class Config
    {
        public string Style { get; set; }
        public string Styledegree { get; set; }
    }

    public class Question
    {
        public int Order { get; set; }
        public string Title { get; set; }
        public int Number1 { get; set; }
        public int Number2 { get; set; }
        public string Operation { get; set; }
        public int NumberOfOptions { get; set; }
        public int Sct { get; set; }
    }
}
