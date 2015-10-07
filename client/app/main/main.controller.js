'use strict';

angular.module('ambestApp')
  .controller('MainCtrl', function ($scope, $http, socket, $mdDialog) {

    // $scope.$on('$destroy', function () {
    //   socket.unsyncUpdates('thing');
    // });

    $scope.uploads = []
    $scope.dataload = function () {
      $http.get('/api/uploads')
      .then(function (list) {
        $scope.uploads = list.data
      })
    }
    $scope.showAdvanced = function(ev) {
      $mdDialog.show({
        scope:$scope,
        preserveScope:true,
        controller: 'DialogController',
        templateUrl: 'app/main/create.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true 
      })
      .then(function(answer) {
        
      }, function() {
        
      });
    };
    $scope.youtubeUrl = null

    $scope.addYoutube = function(url) {
      $scope.youtubeUrl = url
    }
    $scope.dataload()
  })

.controller('DialogController', function($scope, $mdDialog, $http, flowFactory) {
  $scope.title = "타이틀 입력"
  $scope.content = "내용입력"
  $scope.tmpFileName = null
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.create = function() {
    $http.post('/api/uploads', 
      {
        title: $scope.title, 
        content: $scope.content,
        tmpFileName: $scope.tmpFileName,
      })
    .then(function (res) {
      // console.log(res.data)
      $mdDialog.hide()
      $scope.dataload()
    }, function (error) {
      console.log(error)

    })
  }
  $scope.getTmpFileName = function ($file, $message) {
    // console.log('message:',$message)
    $scope.tmpFileName = $message
  }
})