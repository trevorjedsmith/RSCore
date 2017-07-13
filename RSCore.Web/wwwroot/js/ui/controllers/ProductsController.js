var RSCore;
(function (RSCore) {
    class ProductsController {
        constructor() {
            this.dataService = new RSCore.RSCoreDataService($, 'api/products/getAllProducts');
        }
        PageLoad() {
            let viewModel = new RSCore.ProductsViewModel(this.dataService);
            ko.applyBindings(viewModel);
        }
    }
    RSCore.ProductsController = ProductsController;
})(RSCore || (RSCore = {}));
