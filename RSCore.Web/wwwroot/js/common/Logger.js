/// <reference path="../../typings/globals/toastr/index.d.ts" />
var SportsStore;
(function (SportsStore) {
    class Logger {
        constructor() {
            toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-bottom-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": 300,
                "hideDuration": 1000,
                "timeOut": 5000,
                "extendedTimeOut": 1000,
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };
        }
        log(message, data, source, showToast) {
            this.logIt(message, data, source, showToast, 'success');
        }
        logError(message, data, source, showToast) {
            this.logIt(message, data, source, showToast, 'error');
        }
        logIt(message, data, source, showToast, toastType) {
            source = source ? '[' + source + '] ' : '';
            if (data) {
                console.log('Message: ' + message + ', data: ' + data);
            }
            else {
                console.log('Message: ' + message);
            }
            if (showToast) {
                if (toastType === 'error') {
                    toastr.error(message);
                }
                else {
                    toastr.success(message);
                }
            }
        }
    }
    SportsStore.Logger = Logger;
})(SportsStore || (SportsStore = {}));
