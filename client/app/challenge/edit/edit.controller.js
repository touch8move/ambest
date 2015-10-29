'use strict';

angular.module('ambestApp')
.controller('ChallengeEditCtrl', function ($scope, $location, $stateParams, Auth, Challenges, Articles) {
	console.log('$stateParams', $stateParams)
	$scope.challenge = null
	Challenges.get({id:$stateParams.id}, function (challenge) {
		$scope.challenge = challenge
		for (var i in $scope.challenge.challengeItems) {
			$scope.challenge.ChallengeItems[i].challengeFile = false
		}
	}, function (err) {
		console.log(err)
	})

	$scope.getTmpFileName = function ($file, $message, $index) {
		$scope.challenge.challengeItems[$index].changeFile = true
		$scope.challenge.challengeItems[$index].imgPath = $message
	}

	$scope.save = function () {
		Challenges.save($scope.challenge, function (challenge) {
			$location.path('/challenge/view/'+challenge._id)
		})
	}
})
