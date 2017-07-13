/// <reference path="../../typings/globals/jquery/index.d.ts" />
var RSCore;
(function (RSCore) {
    class RSCoreDataService {
        constructor(ajaxService, controllerName) {
            this.ajaxService = ajaxService;
            this.ajaxService.ajaxSettings.crossDomain = true;
            this.baseUri = `${RSCore.Constants.BaseServiceBusUrl}${controllerName}`;
        }
        // GET api/{controller}
        Get() {
            let url = `${this.baseUri}`;
            return this.ExecuteGet(url);
        }
        // GET api/{controller}/1
        GetById(id) {
            let url = `${this.baseUri}/${id}`;
            return this.ExecuteGet(url);
        }
        // POST api/{controller}
        Post(item) {
            let url = this.baseUri;
            return this.ExecutePost(url, item);
        }
        // PUT api/{controller}/5
        Put(item) {
            let url = `${this.baseUri}/${item.id}`;
            return this.ExecutePut(url, item);
        }
        // DELETE api/{controller}/5
        Delete(id) {
            const dfd = this.ajaxService.Deferred();
            var config = {
                url: `{this.baseUri}/{id}`,
                contentType: RSCore.Constants.BaseContentType,
                type: RSCore.Constants.BaseDeleteMethod
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
        ExecuteGet(url, params) {
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
        ExecutePost(url, item) {
            const dfd = this.ajaxService.Deferred();
            var payload = JSON.stringify(item), config = {
                url: url,
                contentType: RSCore.Constants.BaseContentType,
                type: RSCore.Constants.BasePOSTMethod,
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
        ExecutePut(url, item) {
            const dfd = this.ajaxService.Deferred();
            var payload = JSON.stringify(item), config = {
                url: url,
                contentType: RSCore.Constants.BaseContentType,
                type: RSCore.Constants.BasePUTMethod,
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
        ExecuteDelete(url, id) {
            const dfd = this.ajaxService.Deferred();
            //var payload = JSON.stringify(params),
            var config = {
                url: url + '/' + id,
                contentType: RSCore.Constants.BaseContentType,
                type: RSCore.Constants.BaseDeleteMethod
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
    RSCore.RSCoreDataService = RSCoreDataService;
})(RSCore || (RSCore = {}));
