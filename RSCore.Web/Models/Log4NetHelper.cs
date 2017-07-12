using System;
using System.Collections.Generic;
using System.Linq;
using log4net;
using System.Reflection;
using System.IO;

namespace RSCore.Web.Models
{
    public static class Log4NetHelper
    {
        private static bool _isConfigured;

        private static void EnsureConfigured()
        {
            if (!_isConfigured)
            {
                var logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
                log4net.Config.XmlConfigurator.Configure(logRepository, new FileInfo("Log4Net.xml"));
                _isConfigured = true;
            }
        }


        private static ILog GetLogger(string name)
        {
            EnsureConfigured();
            var assembly = Assembly.GetEntryAssembly();
            return LogManager.GetLogger(assembly, Assembly.GetEntryAssembly().GetName().Name);
        }


        public static void Log(string message, LogLevel logLevel, string entityFormalNamePlural, int entityKeyValue, string userName, Exception exception)
        {
            var assemblyName = Assembly.GetEntryAssembly().GetName().Name;
            ILog logger = GetLogger(assemblyName);

            GlobalContext.Properties["EntityFormalNamePlural"] = !String.IsNullOrWhiteSpace(entityFormalNamePlural) ? entityFormalNamePlural : String.Empty;
            GlobalContext.Properties["EntityKeyValue"] = entityKeyValue;
            GlobalContext.Properties["UserName"] = !String.IsNullOrWhiteSpace(userName) ? userName : String.Empty;

            if (exception != null)
                message = exception.Message;

            switch (logLevel)
            {
                case LogLevel.INFO:
                    logger.Info(message, exception);
                    break;

                case LogLevel.DEBUG:
                    logger.Debug(message, exception);
                    break;

                case LogLevel.WARN:
                    logger.Warn(message, exception);
                    break;

                case LogLevel.ERROR:
                    logger.Error(message, exception);
                    break;

                case LogLevel.FATAL:
                    logger.Fatal(message, exception);
                    break;
            }
        }
    }

    public enum LogLevel
    {
        DEBUG,
        INFO,
        WARN,
        ERROR,
        FATAL
    }
}
