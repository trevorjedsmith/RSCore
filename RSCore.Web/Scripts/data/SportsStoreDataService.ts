/// <reference path="../../typings/globals/jquery/index.d.ts" />


namespace SportsStore {
    export class SportsStoreDataService<T>{

        ajaxService: JQueryStatic;

        baseUri: string;

        constructor(ajaxService: JQueryStatic, controllerName: string) {

            this.ajaxService = ajaxService;
            this.ajaxService.ajaxSettings.crossDomain = true;
            this.baseUri = `${Constants.BaseServiceBusUrl}${controllerName}`;

        }

        // GET api/{controller}
        Get(): JQueryPromise<any> {
            let url = `${this.baseUri}`;
            return this.ExecuteGet<any>(url);
        }


        // GET api/{controller}/1
        GetById(id: String): JQueryPromise<any> {
            let url = `${this.baseUri}/${id}`;
            return this.ExecuteGet<any>(url);
        }

        // POST api/{controller}
        Post(item: any): JQueryPromise<T> {
            let url = this.baseUri;
            return this.ExecutePost<T, T>(url, item);
        }

        // PUT api/{controller}/5
        Put(item: any): JQueryPromise<T> {
            let url = `${this.baseUri}/${item.id}`;
            return this.ExecutePut<T>(url, item);
        }

        // DELETE api/{controller}/5
        Delete(id: Number): JQueryPromise<any> {

            const dfd = this.ajaxService.Deferred();
            var config = {
                url: `{this.baseUri}/{id}`,
                contentType: Constants.BaseContentType,
                type: Constants.BaseDeleteMethod
            };
            let me = this;
            this.ajaxService.ajax(config)
                .fail(function (xhr, textStatus, errorThrown) {
                    dfd.reject();
                })
                .done((data: any) => {
                    dfd.resolve(data);
                });

            return dfd.promise();
        }

        public ExecuteGet<T>(url: string, params?: any): JQueryPromise<T> {
            const dfd = this.ajaxService.Deferred();

            let me = this;

            this.ajaxService
                .get(url, params)
                .fail((xhr) => {
                    dfd.reject();
                })
                .done((retVal) => {
                    dfd.resolve(retVal);
                });
            return dfd.promise();
        }

        public ExecutePost<TIn, TOut>(url: string, item: TIn): JQueryPromise<TOut> {
            const dfd = this.ajaxService.Deferred();

            var payload = JSON.stringify(item),
                config = {
                    url: url,
                    contentType: Constants.BaseContentType,
                    type: Constants.BasePOSTMethod,
                    data: payload
                };
            let me = this;
            this.ajaxService.ajax(config)
                .fail(function (xhr, textStatus, errorThrown) {
                    dfd.reject();
                })
                .done((data: TOut) => {
                    dfd.resolve(data);
                });

            return dfd.promise();
        }

        public ExecutePut<T>(url: string, item: T): JQueryPromise<any> {
            const dfd = this.ajaxService.Deferred();


            var payload = JSON.stringify(item),
                config = {
                    url: url,
                    contentType: Constants.BaseContentType,
                    type: Constants.BasePUTMethod,
                    data: payload
                };

            let me = this;
            this.ajaxService.ajax(config)
                .fail(function (xhr, textStatus, errorThrown) {
                    dfd.reject();
                })
                .done((data) => {
                    dfd.resolve(data);
                });

            return dfd.promise();
        }

        public ExecuteDelete<T>(url: string, id: number): JQueryPromise<any> {
            const dfd = this.ajaxService.Deferred();

            //var payload = JSON.stringify(params),
            var config = {
                url: url + '/' + id,
                contentType: Constants.BaseContentType,
                type: Constants.BaseDeleteMethod
            };

            let me = this;
            this.ajaxService.ajax(config)
                .fail(function (xhr, textStatus, errorThrown) {
                    dfd.reject();
                })
                .done((data) => {
                    dfd.resolve(data);
                });

            return dfd.promise();
        }
    }
}