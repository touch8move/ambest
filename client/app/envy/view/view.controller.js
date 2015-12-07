'use strict';

angular.module('ambestApp')
  .controller('EnvyViewCtrl', function ($scope, $stateParams, Envys, EnvyReps, Replys, Auth, $mdDialog, $window, $location) {
    $scope.envy = null
    $scope.auth = Auth
    $scope.envyId = $stateParams.id
    Envys.get({id:$stateParams.id}, function (envy) {
      // if (envy.createdBy == Auth.getCurrentUser()._id) {
      //   envy.isMine = true
      // } else {
      //   envy.isMine = false
      // }
      // console.log(envy)
      $scope.envy = envy
    })

    $scope.replyPost = function () {
      var rep = {
        envyId: $scope.envyId,
        reply: $scope.repPost
      }
      Replys.save({type:'envy'}, rep, function (ret) {
        console.log(ret)
        $scope.envy.replys.push(ret)
        $scope.repPost.text = ''
      })
    }

    $scope.delRep = function (index) {
      var confirm = $mdDialog.confirm()
        .title('Confirm')
        .content('would you wanna delete index:'+index+' reply ?')
        .ariaLabel('Reply')
        .ok('Yes')
        .cancel('No')
      $mdDialog.show(confirm).then(function () {
        Replys.remove({id:$scope.envy.replys[index]._id, type:'envy'}, function (ret) {
          $scope.envy.replys.splice(index, 1)
        })
      }, function () {
      })
    }

    $scope.delEnvy = function (envy) {
      var confirm = $mdDialog.confirm()
        .title('Confirm')
        .content('would you wanna delete this Envy ?')
        .ariaLabel('Envy')
        .ok('Yes')
        .cancel('No')
      $mdDialog.show(confirm).then(function () {
        envy.$remove(function (ret) {
          // $location.path('/envy/fresh')
          $window.history.back()
        }, function (err) {
          console.log(err)
        })
      }, function () {
      })
      
    }
    $scope.editEnvy = function (envy) {
      $location.path('/envy/edit/'+envy._id)
    }
  });
