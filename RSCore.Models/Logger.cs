using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RSCore.Models
{
    public class Logger
    {
        public Int64 LoggerID { get; set; }

        public DateTime LogDate { get; set; }

        public string UserName { get; set; }

        public string Exception { get; set; }

        public string ExceptionType { get; set; }

        public string InnerException { get; set; }

        public string InnerExceptionType { get; set; }

        public string InnerStackTrace { get; set; }

        public string StackTrace { get; set; }

        public string Severity { get; set; }

    }
}
