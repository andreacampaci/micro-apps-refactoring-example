angular.module("sportsStore")
    .constant("dataUrl", "/data/dati")
    .constant("orderUrl", "/data/risposta")
    .controller("sportsStoreCtrl", function ($scope, $http, $location, dataUrl, orderUrl, cart) {
        $scope.data = {};
        $http.get(dataUrl)
            .then(function (data) {
                $scope.data.products = data.data;
            });
        $scope.sendOrder = function (shippingDetails) {
            var order = angular.copy(shippingDetails);
            order.products = cart.getProducts();
            $http.post(orderUrl, order)
                .then(function (response) {
                    $scope.data.orderId = response.data.idOrdine;
                    cart.getProducts().length = 0;
                    $location.path("/complete/" + $scope.data.orderId);
                });
        }
    });