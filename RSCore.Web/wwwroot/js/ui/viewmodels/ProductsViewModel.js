var SportsStore;
(function (SportsStore) {
    class ProductsViewModel {
        constructor(dataService) {
            this.OnInit = () => {
                //init popover
                this.initUpPopover();
                this.showModal();
                //init data
                this.dataServices.ExecuteGet(this.dataServices.baseUri).done((data) => {
                    this.applyProducts(data);
                    this.applyCategories(data);
                    this.logger.log(`${this.productsList().length} Products Loaded`, null, data, true);
                    this.logger.log(`${this.categoriesList().length} Categories Loaded`, null, data, true);
                    console.log(this.productsList());
                }).fail((error) => {
                    this.logger.logError(`Error: ${error}`, null, 'OnInt', true);
                }).always(() => {
                    this.logger.log('Data loaded successfully', null, '', true);
                    this.hideModal();
                });
            };
            this.addToCart = (product) => {
                let ds = new SportsStore.SportsStoreDataService($, 'Carts/AddToCart');
                var params = {
                    productId: product.ProductID
                };
                ds.ExecuteGet(ds.baseUri, params).done((data) => {
                    this.applyCartLines(data);
                    this.logger.log(`${data.Product.Name} has been added to cart`, null, '', true);
                }).fail((error) => {
                    this.logger.logError(`Error: ${error}`, null, 'OnInt', true);
                }).always(() => {
                });
            };
            this.setCategory = (data) => {
                let ds = new SportsStore.SportsStoreDataService($, 'api/products/getAllProducts');
                var params = {
                    Category: data
                };
                ds.ExecuteGet(ds.baseUri, params).done((data) => {
                    this.applyProducts(data);
                    this.applyCategories(data);
                }).fail((error) => {
                    this.logger.logError(`Error: ${error}`, null, 'OnInt', true);
                }).always(() => {
                });
            };
            this.applyProducts = (data) => {
                this.productsList.removeAll();
                this.productsList.push.apply(this.productsList, data.Products);
            };
            this.applyCategories = (data) => {
                this.categoriesList.removeAll();
                this.categoriesList.push.apply(this.categoriesList, data.Categories);
            };
            this.applyCartLines = (data) => {
                this.cartList.removeAll();
                this.cartList.push.apply(this.cartList, data.Cart.Lines);
                console.log('New refreshed cart...');
                console.log(this.cartList());
                this.applyCartTotal(this.cartList());
            };
            this.applyCartTotal = (cartList) => {
                let total = 0;
                for (let i = 0; i < cartList.length; i++) {
                    total += (cartList[i].Quantity * cartList[i].Product.Price);
                }
                this.cartTotal(total);
            };
            this.showCart = () => {
                $('#cart').popover('toggle');
            };
            this.fadeIn = (element) => {
                setTimeout(function () {
                    $('#cart').popover('show');
                    $(element).slideDown(function () {
                        setTimeout(function () {
                            $('#cart').popover('hide');
                        }, 2000);
                    });
                }, 100);
            };
            this.initUpPopover = () => {
                $('#cart').popover({
                    html: true,
                    content: function () {
                        return $('#cart-summary').html();
                    },
                    title: 'Cart Details',
                    placement: 'bottom',
                    animation: true,
                    trigger: 'manual'
                });
            };
            this.showModal = () => {
                $('#busyindicator').fadeIn(500).modal('show');
            };
            this.hideModal = () => {
                $('#busyindicator').fadeOut(1).modal('hide');
            };
            this.dataServices = dataService;
            this.logger = new SportsStore.Logger();
            this.productsList = ko.observableArray([]);
            this.categoriesList = ko.observableArray([]);
            this.cartList = ko.observableArray([]);
            this.cartTotal = ko.observable(0);
            this.OnInit();
        }
    }
    SportsStore.ProductsViewModel = ProductsViewModel;
})(SportsStore || (SportsStore = {}));
