namespace RSCore {

    import logger = RSCore.Logger;

    export class ProductsViewModel {

        private dataServices: RSCoreDataService<any>;

        private logger: logger;

        private productsList: KnockoutObservableArray<any>; //this needs to be a strongly typed products list
        private categoriesList: KnockoutObservableArray<any>;
        private cartList: KnockoutObservableArray<any>;

        private cartTotal: KnockoutObservable<number>;

        constructor(dataService: RSCoreDataService<any>) {
            this.dataServices = dataService;
            this.logger = new RSCore.Logger();
            this.productsList = ko.observableArray([]);
            this.categoriesList = ko.observableArray([]);
            this.cartList = ko.observableArray([]);
            this.cartTotal = ko.observable(0);
            this.OnInit();
        }

        OnInit = () => {
            //init popover
            this.initUpPopover();
            this.showModal();
            //init data
            this.dataServices.ExecuteGet(this.dataServices.baseUri).done((data) => {
                this.applyProducts(data);
                this.applyCategories(data);
                //this is for dev only
                this.logger.log(`${this.productsList().length} Products Loaded`, null, data, true);
                this.logger.log(`${this.categoriesList().length} Categories Loaded`, null, data, true);
            }).fail((error) => {
                //this is for dev only
                this.logger.logError(`Error: ${error}`, null, 'OnInt', true);
                }).always(() => {
                //this is for dev only
                this.logger.log('Data loaded successfully', null, '', true);
                this.hideModal();
            });
        }

        addToCart = (product: any) => {
            let ds = new RSCoreDataService($, 'Carts/AddToCart');

            var params = {
                productId: product.ProductID
            }
            ds.ExecuteGet(ds.baseUri, params).done((data: any) => {
                this.applyCartLines(data);
                this.logger.log(`${data.Product.Name} has been added to cart`, null, '', true);
            }).fail((error) => {
                this.logger.logError(`Error: ${error}`, null, 'OnInt', true);
            }).always(() => {

            });
        }

        setCategory = (data: any) => {

            let ds = new RSCoreDataService($, 'api/products/getAllProducts');

            var params = {
                Category: data
            }
            ds.ExecuteGet(ds.baseUri, params).done((data: any) => {
                this.applyProducts(data);
                this.applyCategories(data);
            }).fail((error) => {
                this.logger.logError(`Error: ${error}`, null, 'OnInt', true);
                }).always(() => {

            });
        }

        applyProducts = (data: any) => {
            this.productsList.removeAll();
            this.productsList.push.apply(this.productsList, data.Products);
        }

        applyCategories = (data: any) => {
            this.categoriesList.removeAll();
            this.categoriesList.push.apply(this.categoriesList, data.Categories);
        }

        applyCartLines = (data: any) => {
            this.cartList.removeAll();
            this.cartList.push.apply(this.cartList, data.Cart.Lines);
            console.log('New refreshed cart...');
            console.log(this.cartList());
            this.applyCartTotal(this.cartList())
        }

        applyCartTotal = (cartList: any) => {
            let total = 0;
            for (let i = 0; i < cartList.length; i++) {
                total += (cartList[i].Quantity * cartList[i].Product.Price);
            }
            this.cartTotal(total);
        }

        showCart = () => {
            $('#cart').popover('toggle');
        }

        fadeIn = (element) => {
            setTimeout(function () {
                $('#cart').popover('show');

                $(element).slideDown(function () {
                    setTimeout(function () {
                        $('#cart').popover('hide');
                    }, 2000);
                });
            }, 100)
        };

        initUpPopover = () => {
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
        }

        showModal = () => {
            $('#busyindicator').fadeIn(500).modal('show');
        }

        hideModal = () => {
            $('#busyindicator').fadeOut(1).modal('hide');
        }

    }
}