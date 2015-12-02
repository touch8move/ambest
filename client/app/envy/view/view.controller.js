'use strict';

angular.module('ambestApp')
  .controller('EnvyViewCtrl', function ($scope, $stateParams, Envys, Auth, EnvyReps) {
    $scope.envy = null
    Envys.get({id:$stateParams.id}, function (envy) {
      if (envy.createdBy == Auth.getCurrentUser()._id) {
        envy.isMine = true
      } else {
        envy.isMine = false
      }
      console.log(envy)
      $scope.envy = envy
    })

    $scope.replyPost = function () {
      var rep = {
        envyId: $stateParams.id,
        reply: $scope.repPost
      }
      EnvyReps.save(rep, function (ret) {
        console.log(ret)
      })
    }
  });
