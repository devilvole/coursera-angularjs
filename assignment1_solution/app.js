(function () {
'use strict';

angular.module('Assignment1App', [])
.controller('Assignment1Controller', Controller);

Controller.$inject = ['$scope'];
function Controller($scope) {
  $scope.lunchList = "";
  $scope.lunchMessage = "";

  $scope.checkClick = function () {
  
    if($scope.lunchList.length == 0) {
      $scope.lunchMessage="Please enter data first";
    }else{
      var lunchItems = $scope.lunchList.split(',');
      if(lunchItems.length > 3 ){
        $scope.lunchMessage="Too much!";
      }else{
        $scope.lunchMessage = "Enjoy!";
      }
  }
  };
}

})();
