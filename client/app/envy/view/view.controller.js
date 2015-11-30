'use strict';

angular.module('ambestApp')
  .controller('EnvyViewCtrl', function ($scope, $stateParams, Envys, Auth) {
    $scope.envy = null
    Envys.get({id:$stateParams.id}, function (envy) {
      if (envy.createdBy == Auth.getCurrentUser()._id) {
        envy.isMine = true
      } else {
        envy.isMine = false
      }
      // console.log(envy)
      $scope.envy = envy
    })
  });
