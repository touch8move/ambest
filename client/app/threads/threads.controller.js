'use strict';

angular.module('ambestApp')
  .controller('ThreadsCtrl', function ($scope, $http, $modal) {
    // 리스트 보여주기 (메인화면)
    $scope.lists = []

    $http.get('/api/threadss')
    .success( function (lists) {
        $scope.lists = lists
    })
    // 신규 쓰레드 버튼누르면
    $scope.new = function (size) {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: "threads.new.html",
            controller: "ThreadModalCtrl",
            size: 'sm'
        })
        // .result.then(function (newThread) {
            // 성공하면 할 일들

        // }, function () {
            // 실패하면 할 일들
        // })
    }
    // 신규 쓰레드 등록하기에서 저장 누르면
    // 리스트에서 쓰레드 항목 누르면
    
  })

  .controller('ThreadModalCtrl', function ($scope, $modalInstance, $location) {
    $scope.create = function () {
        if($scope.title === "" && $scope.contents === "") {
            return
        }
        $http.post('/api/threads', {title: $scope.title, contents:$scope.contents})
        .success( function (ret) {
            $modalInstance.close($scope.selected.item)
            $location.path('/threads')
        })
    }
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel')
    }
  })
