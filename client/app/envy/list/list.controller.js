'use strict';

angular.module('ambestApp')
  .controller('EnvyListCtrl', function ($scope, Envys) {
    $scope.envyInfo = null

    function all() {
    	Envys.query(function (envys) {
    		$scope.envyInfo = envys
    	}, function (err) {
    		console.error(err)
    	})
    }

  });
