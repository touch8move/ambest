'use strict';

angular.module('ambestApp')
  .controller('MainCtrl', function ($scope, $http, socket, $mdDialog) {

    // $scope.$on('$destroy', function () {
    //   socket.unsyncUpdates('thing');
    // });
    $scope.showAlert = function() {
      var alert = $mdDialog.alert({
        title: 'Attention',
        content: 'This is an example of how easy dialogs can be!',
        ok: 'Close'
      });
      $mdDialog
        .show( alert )
        .finally(function() {
          alert = undefined;
        });
    }
    $scope.showAdvanced = function(ev) {
      $mdDialog.show({
        controller: DialogController,
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
  });

function DialogController($scope, $mdDialog) {

  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.create = function(answer) {
    
  };
}
