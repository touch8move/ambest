
angular.module('ambestApp')

.controller('AppCtrl', function($scope, Auth, $mdUtil, $mdSidenav, $location) {
	$scope.isCollapsed = true
	$scope.isLoggedIn = Auth.isLoggedIn
	$scope.isAdmin = Auth.isAdmin
	$scope.getCurrentUser = Auth.getCurrentUser
	$scope.main = function () {
		$location.path('/article/list')
	}
	$scope.logout = function() {
		Auth.logout()
		$mdSidenav('right').close()
		$location.path('/login')
	}
	$scope.signup = function() {
      	$mdSidenav('right').close()
		$location.path('/signup')
	}
	$scope.login = function() {
		$mdSidenav('right').close()
		$location.path('/login')
	}

    $scope.isActive = function(route) {
      return route === $location.path()
    }
    $scope.create = function () {
    	$location.path('/article/create')
    }
    $scope.toggleRight = buildToggler('right')

    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
              .toggle()
              .then(function () {
              })
          },200)
      return debounceFn
    }
})

