'use strict';

angular.module('ambestApp')
  .controller('EnvyEditCtrl', function ($scope, Envys, $location, $stateParams) {
    $scope.envy = null
    Envys.get({id:$stateParams.id}, function (envy) {
      // if (envy.createdBy == Auth.getCurrentUser()._id) {
      //   envy.isMine = true
      // } else {
      //   envy.isMine = false
      // }
      // console.log(envy)
      $scope.envy = envy
    })

    $scope.save = function () {
      $scope.envy.$update(function (envy) {
        $location.path('/envy/'+envy._id)
      })
    }
  })
