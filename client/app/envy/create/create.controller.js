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
      $scope.envy.envyItems[$index].fileName = $message
    }
    $scope.add = function () {
      $scope.envy.envyItems.push({imgPath:'', fileName:'', text:'', progress:0})
    }
    $scope.add()

    $scope.create = function () {
      Envys.save($scope.envy, function (envy) {
        $location.path('/envy/view/'+envy._id)
      })
    }
    $scope.fileProgress = function (file, item) {
      item.progress = Math.floor(file.progress()*100)
      if(file.progress() == 1) {
        $scope.fileUploading = false
      }
    }
    $scope.fileUploadStart = function () {
      // alert('start')
      $scope.fileUploading = true
    }
  });
