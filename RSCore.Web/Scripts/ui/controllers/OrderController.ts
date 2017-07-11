namespace SportsStore {
    export class OrderController {

        constructor() {
           
        }

        PageLoad(vm: SportsStore.OrderViewModel) {       
            ko.applyBindings(vm);
        }
    }
}