(function () {
    'use strict';

    angular.module("NarrowItDownApp", [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective);

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var controller = this;

        controller.nothingFound = false;
        controller.found = [];
        controller.searchTerm = "";

        controller.getMatchedMenuItems = function(psearchTerm) {
            var promise = MenuSearchService.getMatchedMenuItems();

            controller.nothingFound = false;
            controller.found = [];

            if (psearchTerm.length > 0) {

                promise.then(function (response) {

                    var foundItems = [];

                    for (var i = 0; i < response.data.menu_items.length; i++) {
                        if (response.data.menu_items[i].description
                                .toLowerCase().indexOf(psearchTerm.toLowerCase()) != -1) {
                            foundItems.push(response.data.menu_items[i]);
                        }
                    }

                    controller.found = foundItems;

                    if (foundItems.length == 0) {
                        controller.nothingFound = true;
                    }

                })
                .catch(function (error) {
                    console.log("Something was wrong.");
                });

            } else {
                controller.nothingFound = true;
            }
        };


        controller.removeMenuItem = function(index) {
            console.log('removeMenuItem');
            controller.found.splice(index, 1);
        };

    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = function () {

            var response = $http({
                method: "GET",
                url: "https://davids-restaurant.herokuapp.com"+ "/menu_items.json"
            });

            return response;
        };
    }

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                foundItems: '=',
                onRemove: '&onRemove'
            }
        };

        return ddo;
    }


})();