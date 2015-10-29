'use strict';

angular.module('ambestApp')
.controller('ChallengeViewCtrl', function ($scope, $stateParams, Challenges, $location, Likes, Auth) {
	$scope.selectedIndex = 0
	$scope.challenges = []
	$scope.likes = []
	$scope.auth = Auth
	var currentUser = $scope.auth.getCurrentUser()
	console.log($stateParams)
	Challenges.query({id:$stateParams.id, controller:'list'}, 
		function (challenges) {
			challenges.forEach(function (challenge) {
				if (challenge.createdBy == currentUser._id) {
					challenge.isMine = true
				} else {
					challenge.isMine = false
				}
				Likes.query({id:challenge._id}, function (likes) {
					challenge.like = likes
					challenge.isLike = false
					challenge.likeCount = likes.length
					challenge.like.forEach(function (lk) {
						if (lk.createdBy === currentUser._id) {
							challenge.isLike = true
							return
						}
					})
					$scope.challenges.push(challenge)
				})
			})
    	}, function (err){
	})
	$scope.prev = function () {
		if ($scope.selectedIndex>0)
			$scope.selectedIndex -= 1
	}

	$scope.next = function () {
		if($scope.selectedIndex < $scope.challenges.length)
			$scope.selectedIndex += 1
	}

	$scope.thumbup = function (challenge) {
		var _like = {challengeId:challenge._id}
		Likes.save(_like, function (like) {
			challenge.like.push(like)
			// console.log(like)
			challenge.isLike = true
			challenge.likeCount += 1
		}, function (err) {
			console.error(err)
		})
	}

	$scope.cancelthumbup = function (challenge) {
		// console.log('cancelthumbup in')
		// console.log('currentUser', currentUser)
		challenge.like.forEach(function (like) {
			// console.log('likeCreatedBy:', like.createdBy._id)
			if (like.createdBy == currentUser._id) {
				// console.log('deleteProcess')
				Likes.delete({id:like._id}, function (response) {
					// console.log('delete response:', response)
					for (var i in challenge.like) {
						if(challenge.like[i]._id === like._id) {
							// console.log('i:', i)
							// console.log('before del:',challenge.like)
							challenge.like.splice(i, 1)
							// console.log('after del:', challenge.like)
							challenge.isLike = false
							challenge.likeCount -= 1
							return
						}
					}
				})
			}
		})
	}

	$scope.editChallenge = function (challenge) {

		if (Auth.getCurrentUser()._id == challenge.createdBy) {
			console.log(challenge._id)
			$location.path('/challenge/edit/'+challenge._id)
		}
	}

	$scope.delChallenge = function (challenge) {
		if (Auth.getCurrentUser()._id == challenge.createdBy) {
			Challenge.delete({id:challenge._id}, function (response) {
				console.log('delete success')
				$location.path('/challenge/view/'+challenge.articleId)
			})
		}
	}


});
