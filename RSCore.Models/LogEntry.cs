using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RSCore.Models
{
    public class LogEntry
    {
        public Int64 LogEntryID { get; set; }

        [Display(Name = "Date")]
        [Required]
        public DateTime LogDate { get; set; }

        [Required]
        [MaxLength(30)]
        public string Logger { get; set; }

        [Display(Name = "Level")]
        [Required]
        [MaxLength(5)]
        public string LogLevel { get; set; }
        [Required]
        [MaxLength(10)]
        public string Thread { get; set; }

        [Display(Name = "Entity")]
        public string EntityFormalNamePlural { get; set; }

        [Display(Name = "Key")]
        public int EntityKeyValue { get; set; }

        [Display(Name = "User")]
        [Required]
        [MaxLength(256)]
        public string UserName { get; set; }

        [Required]
        [MaxLength(256)]
        public string Message { get; set; }

        public string Exception { get; set; }
    }
}
