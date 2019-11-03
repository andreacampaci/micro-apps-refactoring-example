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
            console.log(components);
            console.log('preparing to load...');
            const node = document.createElement('script');
            node.src = 'http://127.0.0.1:3001/item-component.js';
            if (components.filter(cmp => cmp === node.src).length === 0) {
                components.push(node.src);
                node.type = 'text/javascript';
                node.async = false;
                document.getElementsByTagName('head')[0].appendChild(node);
            }
        };

        $scope.init();

        $scope.selectCategory = function (newCategory) {
            selectedCategory = newCategory;
            $scope.category = selectedCategory;
            $scope.selectedPage = 1;
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