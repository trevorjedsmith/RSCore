var SportsStore;
(function (SportsStore) {
    class ProductsController {
        constructor() {
            this.dataService = new SportsStore.SportsStoreDataService($, 'api/products/getAllProducts');
        }
        PageLoad() {
            let viewModel = new SportsStore.ProductsViewModel(this.dataService);
            ko.applyBindings(viewModel);
        }
    }
    SportsStore.ProductsController = ProductsController;
})(SportsStore || (SportsStore = {}));
