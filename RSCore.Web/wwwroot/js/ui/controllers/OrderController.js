var RSCore;
(function (RSCore) {
    class OrderController {
        constructor() {
        }
        PageLoad(vm) {
            ko.applyBindings(vm);
        }
    }
    RSCore.OrderController = OrderController;
})(RSCore || (RSCore = {}));
