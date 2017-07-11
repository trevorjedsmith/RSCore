namespace SportsStore {

    import logger = SportsStore.Logger;

    export class CartViewModel {

        private dataServices: SportsStore.SportsStoreDataService<any>;

        private logger: logger;

        private cartList: KnockoutObservableArray<any>;
        private cartTotal: KnockoutObservable<number>;

        constructor(dataService: SportsStore.SportsStoreDataService<any>) {
            this.dataServices = dataService;
            this.logger = new SportsStore.Logger();
            this.cartList = ko.observableArray();
            this.cartTotal = ko.observable(0);
            this.OnInit();
        }

        OnInit = () => {
            this.showModal();
            //init data for page
            this.dataServices.ExecuteGet(this.dataServices.baseUri).done((data) => {
                this.applyCartLines(data);
                this.logger.log('Data loaded.', null, '', true);
            }).fail((error) => {
                this.logger.log('Error loading..', null, '', true);
            }).always(() => {
                this.logger.log('Finished loading..', null, '', true);
                this.hideModal();
            });
        }

        removeItem = (object: any) => {

            let ds = new SportsStore.SportsStoreDataService($, 'Carts/RemoveFromCart');

            var params = {
                productId: object.Product.ProductID || 0
            };

            ds.ExecuteGet(ds.baseUri, params).done((data: any) => {
                this.applyCartLines(data);
                this.logger.logError(`${data.Product.Name} has been removed`, null, '', true);
            }).fail((error) => {
                this.logger.logError(`Error: ${error}`, null, 'OnInt', true);
                }).always(() => {

            });
        }

        applyCartLines = (data: any) => {
            this.cartList.removeAll();
            this.cartList.push.apply(this.cartList, data.Cart.Lines);
            this.applyCartTotal(this.cartList())
        }

        applyCartTotal = (cartList: any) => {
            let total = 0;
            for (let i = 0; i < cartList.length; i++) {
                total += (cartList[i].Quantity * cartList[i].Product.Price);
            }
            this.cartTotal(total);
        }



        showModal = () => {
            $('#busyindicator').fadeIn(500).modal('show');
        }

        hideModal = () => {
            $('#busyindicator').fadeOut(1).modal('hide');
        }

    }
}