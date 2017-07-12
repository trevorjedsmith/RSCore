using RSCore.Data.Abstract;
using RSCore.Web.Helpers.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RSCore.Models;
using System.Text;
using RSCore.Models.Enums;

namespace RSCore.Web.Helpers
{
    public class ExceptionUtility : IExceptionUtility
    {
        private IEntityRepository<Logger> _logger;

        public ExceptionUtility(IEntityRepository<Logger> logger)
        {
            _logger = logger;
        }
        public void LogException(Exception exc, string username, LogLevel logLevel)
        {
            Logger newLogEntry = new Logger();
            newLogEntry.LogDate = DateTime.Now;

            switch (logLevel)
            {
                case LogLevel.INFO:
                    newLogEntry.Severity = "Information";
                    break;

                case LogLevel.DEBUG:
                    newLogEntry.Severity = "Debug";
                    break;

                case LogLevel.WARN:
                    newLogEntry.Severity = "Warning";
                    break;

                case LogLevel.ERROR:
                    newLogEntry.Severity = "Error";
                    break;

                case LogLevel.FATAL:
                    newLogEntry.Severity = "Fatal";
                    break;
            }

            if (exc.InnerException != null)
            {
                newLogEntry.InnerExceptionType = string.Format("Inner Exception Type: {0}", exc.InnerException.GetType().ToString());

                newLogEntry.InnerException = string.Format("Inner Exception: {0}", exc.InnerException.Message);

                if (exc.InnerException.StackTrace != null)
                {
                    newLogEntry.InnerStackTrace = string.Format("Inner Stack Trace: {0}", exc.InnerException.StackTrace);
                }
            }
            newLogEntry.ExceptionType = string.Format("Exception Type: {0}", exc.GetType().ToString());

            newLogEntry.Exception = string.Format("Exception: {0}", exc.Message);

            if (exc.StackTrace != null)
            {
                newLogEntry.StackTrace = string.Format("Stack Trace: {0}", exc.StackTrace);
            }

            _logger.Add(newLogEntry);
            _logger.Commit();
        }
    }
}
