'use strict';

angular.module('ambestApp')
	.controller('ChallengeCreateCtrl', function ($scope, $stateParams, Auth, $location, Challenges) {
		// $scope.article = Articles.get({articleId:$stateParams.articleId})
		$scope.auth = Auth
		$scope.challenge = {
			articleId: $stateParams.articleId,
			title: "",
			challengeItems:[]
		}
		$scope.back = function () {
			$location.path('/article/view/'+ $stateParams.articleId)
		}
		$scope.create = function () {
			Challenges.save($scope.challenge, function (challenge) {
				$location.path('/challenge/view/'+$stateParams.articleId)
			})
		}
		$scope.add = function () {
			$scope.challenge.challengeItems.push({
			content: "",
			imgPath: ""
		})
		}
		$scope.add()

		$scope.getTmpFileName = function ($file, $message, $index) {
			$scope.challenge.challengeItems[$index].imgPath = $message
		}
	})
