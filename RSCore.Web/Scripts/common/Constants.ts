namespace RSCore {

    export class Constants {
        //BaseServiceUrl can be swopped out at runtime
        static BaseServiceBusUrl: string = "http://localhost:64741/";
        static BaseContentType: string = "application/json";
        static BaseDeleteMethod: string = "DELETE";
        static BasePOSTMethod: string = "POST";
        static BasePUTMethod: string = "PUT";
    }
}