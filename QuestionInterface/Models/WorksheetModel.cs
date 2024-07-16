using System.Collections.Generic;

namespace QuestionInterface.Models
{
    public class WorksheetModel
    {
        public int WorksheetId { get; set; }
        public int SkillId { get; set; }
        public int Number { get; set; }
        public int Level { get; set; }
        public TitleModel Title { get; set; } = new TitleModel();
        public FinalMessageModel FinalMessage { get; set; } = new FinalMessageModel();
        public string WorksheetType { get; set; }
        public List<QuestionModel> Qus { get; set; } = new List<QuestionModel>();
    }

    public class TitleModel
    {
        public string Text { get; set; }
        public ConfigModel Config { get; set; } = new ConfigModel();
    }

    public class FinalMessageModel
    {
        public string Text { get; set; }
        public ConfigModel Config { get; set; } = new ConfigModel();
    }

    public class ConfigModel
    {
        public string Style { get; set; }
        public string Styledegree { get; set; }
    }

    public class QuestionModel
    {
        public int Order { get; set; }
        public TitleModel Title { get; set; } = new TitleModel();
        public SettingsModel Settings { get; set; } = new SettingsModel();
        public int NumberOfOptions { get; set; }
        public int Sct { get; set; }
    }

    public class SettingsModel
    {
        public int Number1 { get; set; }
        public int Number2 { get; set; }
        public string Operation { get; set; }
    }

}
