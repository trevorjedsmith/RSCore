var RSCore;
(function (RSCore) {
    class Constants {
    }
    //BaseServiceUrl can be swopped out at runtime
    Constants.BaseServiceBusUrl = "http://localhost:64741/";
    Constants.BaseContentType = "application/json";
    Constants.BaseDeleteMethod = "DELETE";
    Constants.BasePOSTMethod = "POST";
    Constants.BasePUTMethod = "PUT";
    RSCore.Constants = Constants;
})(RSCore || (RSCore = {}));
