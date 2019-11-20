angular.module("sportsStore")
    .constant("productListActiveClass", "btn-primary")
    .constant("components", [])
    .constant("productListPageCount", 3)
    .controller("productListCtrl", function ($scope, $filter, productListActiveClass, components, productListPageCount, cart) {
        var selectedCategory = null;
        $scope.selectedPage = 1;
        $scope.pageSize = productListPageCount;
        $scope.category = null;

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
            loadWebComponent('http://127.0.0.1:3001/item-component.js');
            loadWebComponent('http://127.0.0.1:3002/category-list.js');
        };

        $scope.init();

        $scope.selectCategory = function (newCategory) {
            $scope.category = newCategory.detail;
        }

        $scope.selectPage = function (newPage) {
            $scope.selectedPage = newPage;
        }

        $scope.categoryFilterFn = function (product) {
            return selectedCategory == null || product.category == selectedCategory;
        }
        $scope.getCategoryClass = function (category) {
            return selectedCategory == category ? productListActiveClass : "";
        }
        $scope.getPageClass = function (page) {
            return $scope.selectedPage == page ? productListActiveClass : "";
        }

        $scope.addProductToCart = function ($event) {
            var product = $event.detail;
            cart.addProduct(product.id, product.name, product.price);
        }
    });