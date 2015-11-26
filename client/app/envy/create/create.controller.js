'use strict';

angular.module('ambestApp')
  .controller('EnvyCreateCtrl', function ($scope, Envys, $location) {
    $scope.message = 'Hello';
    $scope.envy = {
      title:'',
      envyItems: []
    }
    $scope.getTmpFileName = function ($file, $message, $index) {
      console.log($message)
      $scope.envy.envyItems[$index].imgPath = $message
    }
    $scope.add = function () {
      $scope.envy.envyItems.push({imgPath:'', text:''})
    }
    $scope.add()

    $scope.create = function () {
      Envys.save($scope.envy, function (envy) {
        $location.path('/envy/'+envy._id)
      })
    }
  });
