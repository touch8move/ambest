'use strict';

angular.module('ambestApp')
  .controller('ArticleViewCtrl', function ($scope, Articles, $location, $stateParams, Replys, Auth) {
  	$scope.article = null
  	Articles.get({id:$stateParams.id}, function (article) {
  		if (article.createdBy == Auth.getCurrentUser()._id) {
  			article.isMine = true
  		} else {
  			article.isMine = false
  		}
  		$scope.article = article
  	})

  	$scope.replys = null
  	$scope.replysCount = 0
  	
  	Replys.query({id:$stateParams.id}, function (replys) {
  		$scope.replys = replys
  		$scope.replysCount = $scope.replys.length
  	})
  	
  	$scope.challengerList = function (articleId) {
  		$location.path('/challenge/view/'+articleId)
  	}
  	$scope.challenge = function (articleId) {
  		$location.path('/challenge/create/'+articleId)
  	}
  	$scope.replyPost = function () {
  		Replys.save({articleId:$scope.article._id, content:$scope.reply.content}, function (reply) {
  			console.log(reply)
  			$scope.replys.push(reply)
  			$scope.replysCount += 1
  			$scope.reply.content = ""
  		})
  	}
  	$scope.delReply = function (reply) {
  		Replys.delete({id:reply._id}, function (response) {
  			console.log('delete reply !!!!!')
  			console.log(response)
  			for (var i in $scope.replys) {
  				if ($scope.replys[i]._id == reply._id) {
  					$scope.replys.splice(i,1)
  					$scope.replysCount -= 1
  					return
  				}
  			}
  		})
  	}

  	$scope.delArticle = function (article) {
  		if (Auth.getCurrentUser()._id == article.createdBy) {
	  		Articles.delete({id:article._id}, function (response) {
	  			console.log('delete article !!!!')
	  			$location.path('/article/list')
	  		})
	  	} else {
	  		console.log(' No Authorization !!!')
	  	}
  	}

  	$scope.editArticle = function (article) {
  		if (Auth.getCurrentUser()._id == article.createdBy) {
  			$location.path('/article/edit/'+article._id)
  		} else {
  			console.log(' No Authorization !!!')
  		}
  	}
})
