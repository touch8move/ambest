'use strict';

angular.module('ambestApp')
  .controller('EnvyEditCtrl', function ($scope, Envys, $location, $stateParams, $window) {
    $scope.envy = null
    Envys.get({id:$stateParams.id}, function (envy) {
      console.log(envy)
      $scope.envy = envy
    })

    $scope.save = function () {
      console.log($scope.envy)
      $scope.envy.$update(function (envy) {
        $window.history.back()
      })
    }

    $scope.getTmpFileName = function ($file, $message, $index) {
      $scope.envy.envyItems[$index].imgPath = ''
      $scope.envy.envyItems[$index].fileName = $message
    }
    $scope.add = function () {
      $scope.envy.envyItems.push({imgPath:'', fileName:'', text:''})
    }
  })
