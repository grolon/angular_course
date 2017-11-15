(function () {
    'use strict';

    angular.module("LunchCheck", [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    
    function LunchCheckController($scope) {
        $scope.lunchMenu = '';
        $scope.error = null;

        $scope.checkIfTooMuch = function () {

            if( $scope.lunchMenu != '') {
                var splits = $scope.lunchMenu.split(',');
                var count = 0;

                for(var i=0; i<splits.length; i++) {
                    if(splits[i].trim() != '') {
                        count++;
                    }
                }

                if(count <= 3) {
                    $scope.message = 'Enjoy!';
                } else {
                    $scope.message = 'Too much!';
                }

                $scope.error = false;
            } else {
                $scope.message = 'Please enter data first';
                $scope.error = true;
            }

        }
    }

})();