var RSCore;
(function (RSCore) {
    class CartViewModel {
        constructor(dataService) {
            this.OnInit = () => {
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
            };
            this.removeItem = (object) => {
                let ds = new RSCore.RSCoreDataService($, 'Carts/RemoveFromCart');
                var params = {
                    productId: object.Product.ProductID || 0
                };
                ds.ExecuteGet(ds.baseUri, params).done((data) => {
                    this.applyCartLines(data);
                    this.logger.logError(`${data.Product.Name} has been removed`, null, '', true);
                }).fail((error) => {
                    this.logger.logError(`Error: ${error}`, null, 'OnInt', true);
                }).always(() => {
                });
            };
            this.applyCartLines = (data) => {
                this.cartList.removeAll();
                this.cartList.push.apply(this.cartList, data.Cart.Lines);
                this.applyCartTotal(this.cartList());
            };
            this.applyCartTotal = (cartList) => {
                let total = 0;
                for (let i = 0; i < cartList.length; i++) {
                    total += (cartList[i].Quantity * cartList[i].Product.Price);
                }
                this.cartTotal(total);
            };
            this.showModal = () => {
                $('#busyindicator').fadeIn(500).modal('show');
            };
            this.hideModal = () => {
                $('#busyindicator').fadeOut(1).modal('hide');
            };
            this.dataServices = dataService;
            this.logger = new RSCore.Logger();
            this.cartList = ko.observableArray();
            this.cartTotal = ko.observable(0);
            this.OnInit();
        }
    }
    RSCore.CartViewModel = CartViewModel;
})(RSCore || (RSCore = {}));
