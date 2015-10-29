'use strict';

angular.module('ambestApp')
.controller('ArticleEditCtrl', function ($scope, $location, Articles, $stateParams) {
	$scope.article = null
	$scope.changeFile = false
	Articles.get({id:$stateParams.id}, function (article) {
		$scope.article = article
	})

	$scope.cancel = function () {
		$location.path('/article/view/'+$scope.article._id)
	}

	$scope.edit = function () {
		
		var _article = {
			title: $scope.article.title,
			imgPath: $scope.article.imgPath,
			content: $scope.article.content
		}
		Articles.save(_article, function (article) {
			console.log('edit')
			$location.path('/article/view/'+article._id)
		})
	}

	$scope.getTmpFileName = function ($file, $message) {
		$scope.changeFile = true
		$scope.article.imgPath = $message
	}
});
