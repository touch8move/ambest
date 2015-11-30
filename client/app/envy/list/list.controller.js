'use strict';

angular.module('ambestApp')
  .controller('EnvyListCtrl', function ($scope, Auth, $location) {
    $scope.isCollapsed = true
    $scope.isLoggedIn = Auth.isLoggedIn
    $scope.isAdmin = Auth.isAdmin
    $scope.getCurrentUser = Auth.getCurrentUser
    $scope.selectedIndex = 0
    // account
    console.log('envyCtrl')

    $scope.logout = function() {
      Auth.logout()
      // $scope.$emit('div_close')
      $location.path('/logout')
    }
    $scope.signup = function() {
      // $mdSidenav('right').close()
      $location.path('/signup')
    }
    $scope.login = function() {
      // $mdSidenav('right').close()
      $location.path('/login')
    }

    
  })
  .controller('EnvyListFreshCtrl', function ($scope, Envys, $location) {
    console.log('freshCTRL')
    $scope.envyInfo = null
    function all() {
      Envys.query(function (envys) {
        console.log(envys)
        $scope.envyInfo = envys
      }, function (err) {
        console.error(err)
      })
    }
    $scope.envyInfo = all()
    $scope.go = function (id) {
      $location.path('/envy/view/'+id)
    }
  })
