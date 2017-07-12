
using RSCore.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSCore.Web.Helpers.Abstract
{
    public interface IExceptionUtility
    {
        void LogException(Exception exc, string username, LogLevel logLevel);
    }
}
