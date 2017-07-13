var RSCore;
(function (RSCore) {
    class CartController {
        constructor() {
            this.dataService = new RSCore.RSCoreDataService($, 'Carts/GetAllItems');
        }
        PageLoad(model) {
            let viewModel = new RSCore.CartViewModel(this.dataService);
            ko.applyBindings(viewModel);
        }
    }
    RSCore.CartController = CartController;
})(RSCore || (RSCore = {}));
