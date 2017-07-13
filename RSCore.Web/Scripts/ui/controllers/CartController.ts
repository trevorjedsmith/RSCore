namespace RSCore {

    export class CartController {
        private dataService: RSCoreDataService<any>;
        private containerElementId: string;


        constructor() {
            this.dataService = new RSCoreDataService($, 'Carts/GetAllItems');

        }

        PageLoad(model: any) {
            let viewModel = new RSCore.CartViewModel(this.dataService);
            ko.applyBindings(viewModel);
        }

    }
}