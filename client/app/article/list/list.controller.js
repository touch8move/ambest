'use strict';

angular.module('ambestApp')
	.controller('ArticleListCtrl', function ($scope, $location, $mdUtil, $mdSidenav, Articles, Auth, CardInfos) {
		$scope.isCollapsed = true
		$scope.isLoggedIn = Auth.isLoggedIn
		$scope.isAdmin = Auth.isAdmin
		$scope.getCurrentUser = Auth.getCurrentUser

		$scope.cardInfos = null
		$scope.cardInfosHot = null
		$scope.cardInfosFavorite = null
		$scope.selectedIndex = 1

		$scope.loadFresh = function () {
			CardInfos.query(function (cdinfos) {
				$scope.cardInfos = cdinfos
			}, function (err) {
				console.error(err)
			})
		}

		$scope.loadHot = function () {
			CardInfos.query({type:'hot'}, function (cdinfos) {
				$scope.cardInfosHot = cdinfos
			}, function (err) {
				console.error(err)
			})
		}

		$scope.loadFavorite = function () {
			CardInfos.query({type:'fav'}, function (cdinfos) {
				$scope.cardInfosFavorite = cdinfos
			}, function (err) {
				console.error(err)
			})
		}



		$scope.go = function (id) {
			$location.path('/article/view/'+id)
		}
		$scope.create = function () {
			$location.path('/article/create')
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
	});
