(function () {
    'use strict';

    angular.module("NarrowItDownApp", [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective);


    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                items: '<',
                myTitle: '@title',
                badRemove: '=',
                onRemove: '&'
            },
            controller: NarrowItDownController,
            controllerAs: 'cntrl',
            bindToController: true
        };

        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var controller = this;

        var promise = MenuSearchService.getMatchedMenuItems('');

        promise.then(function (response) {
            // // process result and only keep items that match
            // var foundItems...
            //
            // // return processed items
            // return foundItems;

            controller.found = response.data;
        })
        .catch(function (error) {
            console.log("Error! something went wrong.");
        });
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {

            var response = $http({
                url: "https://davids-restaurant.herokuapp.com"+ "/menu_items.json",
                params: {
                    "searchTerm": searchTerm
                }
            });

            return response;
        }
    }
})();