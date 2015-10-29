'use strict';

angular.module('ambestApp')
.controller('ArticleCreateCtrl', function ($scope, Auth, $location, $resource, Articles, $mdDialog) {
	$scope.auth = Auth
	$scope.article = {
		title: "",
		content: "",
		imgPath: ""
	}
	
	$scope.create = function() {
		if($scope.auth.isLoggedIn()) {
			Articles.save($scope.article, function (article) {
				console.log(article)
				var confirm = $mdDialog.confirm()
					.title('Confirm')
					.content('Do you wanna challenge ?')
					.ariaLabel('challenge')
					.ok('Challenge')
					.cancel('Later')
				$mdDialog.show(confirm).then(function () {
					$location.path('/challenge/create/'+article._id)
				}, function () {
					$location.path('/article/view/'+article._id)
				})
				// $location.path('/article/view/'+article.id)
			}, function (err) {
				console.log(err)
			})
		} else {
			$location.path('/login')
		}
	}
	$scope.cancel = function () {
		$location.path('/')
	}
	$scope.getTmpFileName = function ($file, $message) {
		$scope.article.imgPath = $message
	}
})
