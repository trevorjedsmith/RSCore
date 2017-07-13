namespace RSCore {

    export class ProductsController {
        private dataService: RSCoreDataService<any>;
        private containerElementId: string;

        constructor() {
            this.dataService = new RSCoreDataService($, 'api/products/get');
        }

        PageLoad() {
            let viewModel = new RSCore.ProductsViewModel(this.dataService);
            ko.applyBindings(viewModel);
        }

    }
}