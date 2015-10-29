'use strict';

angular.module('ambestApp')
  .controller('ArticleListCtrl', function ($scope, $location, Articles) {
  	$scope.articles = null
    Articles.query(function(list) {
    	$scope.articles = list
    }, function (err) {
    	console.err(err)
    })

    $scope.go = function (id) {
    	$location.path('/article/view/'+id)
    }
  });
