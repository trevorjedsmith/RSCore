namespace SportsStore {

    export class CartController {
        private dataService: SportsStore.SportsStoreDataService<any>;
        private containerElementId: string;


        constructor() {
            this.dataService = new SportsStore.SportsStoreDataService($, 'Carts/GetAllItems');

        }

        PageLoad(model: any) {
            let viewModel = new SportsStore.CartViewModel(this.dataService);
            ko.applyBindings(viewModel);
        }

    }
}