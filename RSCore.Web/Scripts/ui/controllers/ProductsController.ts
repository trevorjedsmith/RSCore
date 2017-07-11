namespace SportsStore {

    export class ProductsController {
        private dataService: SportsStore.SportsStoreDataService<any>;
        private containerElementId: string;

        constructor() {
            this.dataService = new SportsStore.SportsStoreDataService($, 'api/products/getAllProducts');
        }

        PageLoad() {
            let viewModel = new SportsStore.ProductsViewModel(this.dataService);
            ko.applyBindings(viewModel);
        }

    }
}