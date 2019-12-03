angular.module("carrello", [])
    .factory("cart", function () {
        var cartData = [];
        return {
            addProduct: function (id, name, price) {
                var addedToExistingItem = false;
                for (var i = 0; i < cartData.length; i++) {
                    if (cartData[i].id == id) {
                        cartData[i].count++;
                        addedToExistingItem = true;
                        break;
                    }
                }
                if (!addedToExistingItem) {
                    cartData.push({
                        count: 1, id: id, price: price, name: name
                    });
                }
            },
            removeProduct: function (id) {
                for (var i = 0; i < cartData.length; i++) {
                    if (cartData[i].id == id) {
                        cartData.splice(i, 1);
                        break;
                    }
                }
            },
            getProducts: function () {
                return cartData;
            }
        }
    })
    .directive("cartSummary", function (cart) {
        return {
            restrict: "E",
            templateUrl: "views/cartSummary.html",
            controller: function ($scope, components) {

                $scope.init = function () {
                    var loadWebComponent = function (src) {
                        const node = document.createElement('script');
                        node.src = src;
                        if (components.filter(cmp => cmp === node.src).length === 0) {
                            components.push(node.src);
                            node.type = 'text/javascript';
                            node.async = false;
                            document.getElementsByTagName('head')[0].appendChild(node);
                        }
                    };
                    loadWebComponent('http://127.0.0.1:3003/checkout-header.js');
                    loadWebComponent('http://127.0.0.1:3004/checkout-list.js');
                };

                $scope.init();

                $scope.cartData = cart.getProducts();

                $scope.goToCheckoutPage = function () {
                    window.location.href = '#/checkout';
                }
            }
        };
    });