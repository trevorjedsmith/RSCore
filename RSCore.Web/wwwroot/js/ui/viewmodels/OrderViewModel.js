var RSCore;
(function (RSCore) {
    class OrderViewModel {
        constructor(dataService) {
            this.OnInit = () => {
                this.showModal();
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
            this.applyCartLines = (data) => {
                this.orderlines.removeAll();
                this.orderlines.push.apply(this.orderlines, data.Cart.Lines);
            };
            this.submitOrder = () => {
                //call api controller for orders
                //submit order
                //clear cart
                //window reload to success page with orderId
                this.showModal();
                let order = {
                    Id: this.id(),
                    Name: this.name(),
                    Line1: this.line1(),
                    Line2: this.line2(),
                    Line3: this.line3(),
                    City: this.city(),
                    State: this.state(),
                    Zip: this.zip(),
                    Country: this.country(),
                    GiftWrap: this.giftwrap(),
                    OrderLines: this.getOrderLines(this.orderlines())
                };
                let ds = new RSCore.RSCoreDataService($, 'api/Orders/CreateOrder');
                ds.ExecutePost(ds.baseUri, order).done((data) => {
                    console.log('Order Return');
                    console.log(data);
                    window.location.href = "Success?OrderId=" + data.Order.Id;
                }).fail((error) => {
                    console.log(error);
                    this.logger.logError('There was an error please try again', error, 'Create Order', true);
                }).always(() => {
                    this.hideModal();
                });
            };
            this.cancelOrder = () => {
                //toggle modal()
                //call cart controller to clear cart
                //on success window.reload to start page
                let ds = new RSCore.RSCoreDataService($, 'Carts/ClearAllCartItems');
                ds.ExecutePost(ds.baseUri, '').done((data) => {
                    //put an are you sure model here
                    window.location.href = "Cancelled";
                }).fail((error) => {
                    this.logger.logError('There was an error please try again', error, 'Create Order', true);
                }).always(() => {
                    this.hideModal();
                });
            };
            this.cancelConfirm = () => {
                $('#del-confirm').fadeIn(500).modal('show');
            };
            this.getOrderLines = (orderLines) => {
                var newArray = new Array();
                for (let i = 0; i < orderLines.length; i++) {
                    let newObjectForPost = {
                        ProductId: orderLines[i].Product.ProductID,
                        Quantity: orderLines[i].Quantity,
                        ProductPrice: orderLines[i].Product.Price
                    };
                    newArray[i] = newObjectForPost;
                }
                return newArray;
            };
            this.showModal = () => {
                $('#busyindicator').fadeIn(500).modal('show');
            };
            this.hideModal = () => {
                $('#busyindicator').fadeOut(1).modal('hide');
            };
            this.dataServices = dataService;
            this.logger = new RSCore.Logger();
            this.id = ko.observable(0);
            this.name = ko.observable('').extend({ required: true });
            this.line1 = ko.observable('');
            this.line2 = ko.observable('');
            this.line3 = ko.observable('');
            this.orderlines = ko.observableArray();
            this.city = ko.observable('');
            this.state = ko.observable('');
            this.zip = ko.observable('');
            this.country = ko.observable('');
            this.giftwrap = ko.observable(false);
            this.OnInit();
        }
    }
    RSCore.OrderViewModel = OrderViewModel;
})(RSCore || (RSCore = {}));
