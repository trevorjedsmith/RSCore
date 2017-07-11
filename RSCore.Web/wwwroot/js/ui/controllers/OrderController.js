var SportsStore;
(function (SportsStore) {
    class OrderController {
        constructor() {
        }
        PageLoad(vm) {
            ko.applyBindings(vm);
        }
    }
    SportsStore.OrderController = OrderController;
})(SportsStore || (SportsStore = {}));
