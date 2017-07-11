var SportsStore;
(function (SportsStore) {
    class CartController {
        constructor() {
            this.dataService = new SportsStore.SportsStoreDataService($, 'Carts/GetAllItems');
        }
        PageLoad(model) {
            let viewModel = new SportsStore.CartViewModel(this.dataService);
            ko.applyBindings(viewModel);
        }
    }
    SportsStore.CartController = CartController;
})(SportsStore || (SportsStore = {}));
