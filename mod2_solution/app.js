(function () {
    'use strict';

    angular.module("ShoppingListCheckOff", [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('shoppingListService', ShoppingListCheckOffService);


    ToBuyController.$inject = ['$scope', 'shoppingListService'];
    function ToBuyController($scope, shoppingListService) {
        $scope.toBuyList = shoppingListService.getToBuyList();

        $scope.moveToBoughtList = function(index) {
            shoppingListService.moveToBoughtList(index);
        }
    }

    AlreadyBoughtController.$inject = ['$scope', 'shoppingListService'];
    function AlreadyBoughtController($scope, shoppingListService) {
        $scope.boughtList = shoppingListService.getBoughtList();
    }

    function ShoppingListCheckOffService() {
        var service = this;

        var toBuyList = [{
            name: 'cookies',
            quantity: 10
        },{
            name: 'mandicas',
            quantity: 10
        },{
            name: 'chorizos',
            quantity: 10
        },{
            name: 'cervezas',
            quantity: 10
        },{
            name: 'asados',
            quantity: 10
        }];

        var boughtList = [];

        service.getToBuyList = function() {
            return toBuyList;
        };

        service.getBoughtList = function() {
            return boughtList;
        };

        service.moveToBoughtList = function(index) {
            var item = toBuyList[index];
            toBuyList.splice(index, 1);
            boughtList.push(item);
        };
    }

})();