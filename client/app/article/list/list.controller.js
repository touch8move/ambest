'use strict';

angular.module('ambestApp')
	.controller('ArticleListCtrl', function ($scope, $location, $mdUtil, $mdSidenav, Articles, Auth) {
		$scope.isCollapsed = true
		$scope.isLoggedIn = Auth.isLoggedIn
		$scope.isAdmin = Auth.isAdmin
		$scope.getCurrentUser = Auth.getCurrentUser

		$scope.selectedIndex = 0

		$scope.create = function () {
		}

		$scope.logout = function() {
			Auth.logout()
			$scope.$emit('div_close')
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
	.controller('ArticleListHotCtrl', function ($scope, $location, CardInfos) {

		$scope.cardInfos = null
		CardInfos.query({type:'hot'}, function (cdinfos) {
			$scope.cardInfos = cdinfos
		}, function (err) {
			console.error(err)
		})

		$scope.go = function (id) {
			$location.path('/article/view/'+id)
		}
	})
	.controller('ArticleListFreshCtrl', function ($scope, $location, CardInfos) {

		$scope.cardInfos = null

		CardInfos.query(function (cdinfos) {
			$scope.cardInfos = cdinfos
		}, function (err) {
			console.error(err)
		})

		$scope.go = function (id) {
			$location.path('/article/view/'+id)
		}
	})
	.controller('ArticleListFavCtrl', function ($scope, $location, CardInfos) {

		$scope.cardInfos = null
		CardInfos.query({type:'fav'}, function (cdinfos) {
			$scope.cardInfos = cdinfos
		}, function (err) {
			console.error(err)
		})

		$scope.go = function (id) {
			$location.path('/article/view/'+id)
		}
	})
