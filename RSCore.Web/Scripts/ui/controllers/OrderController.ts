namespace RSCore {
    export class OrderController {

        constructor() {
           
        }

        PageLoad(vm: RSCore.OrderViewModel) {       
            ko.applyBindings(vm);
        }
    }
}