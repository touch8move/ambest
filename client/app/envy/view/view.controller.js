'use strict';

angular.module('ambestApp')
  .controller('EnvyViewCtrl', function ($scope, $stateParams, Envys, EnvyReps, Replys, Likes, Auth, $mdDialog, $window, $location) {
    $scope.envy = null
    $scope.auth = Auth
    $scope.envyId = $stateParams.id
    $scope.likeIndex = -1
    Envys.get({id:$stateParams.id}, function (envy) {
      $scope.envy = envy
      $scope.envy.likes.every(function (like, index) {
        if(like.createdBy == Auth.getCurrentUser()._id) {
          $scope.likeIndex = index
          return false
        } else {
          return true
        }
      })
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
    
    $scope.like = function () {
      Likes.save({id:$scope.envy._id}, {createdBy:Auth.getCurrentUser()._id}, function (ret) {
        console.log(ret.like)
        $scope.envy.likes.push(ret.like)
        $scope.likeIndex = $scope.envy.likes.length -1
      }, function (err) {
        console.error(err)
      })
    }
    $scope.cancelLike = function () {
      Likes.get({id:$scope.envy.likes[$scope.likeIndex]._id}, function (like) {
        console.log(like)
        like.$delete(function (ret) {
          console.log('before', $scope.envy.likes)
          $scope.envy.likes.splice($scope.likeIndex, 1)
          console.log('after', $scope.envy.likes)
          $scope.likeIndex = -1
        }, function (err) {
          console.error(err)
        })
      }, function (err) {
        console.error(err)
      })
    }
  });
