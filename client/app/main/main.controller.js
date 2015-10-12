'use strict';

angular.module('ambestApp')
  .controller('MainCtrl', function ($scope, $http, socket, $mdDialog) {

    // $scope.$on('$destroy', function () {
    //   socket.unsyncUpdates('thing');
    // });
    $scope.dialogStack = []

    $scope.uploads = []

    $scope.cancel = function() {
      $scope.dialogStack.pop()
      
      $mdDialog.cancel();
      if($scope.dialogStack.length > 0) {
        console.log("multi")
        $mdDialog.show($scope.dialogStack[$scope.dialogStack.length-1])
      }
      
    };
    $scope.dataload = function () {
      $http.get('/api/uploads')
      .then(function (list) {
        $scope.uploads = list.data
      })
    }
    $scope.showAdvanced = function($event) {
      $scope.dialogStack.push({
        scope:$scope,
        preserveScope:true,
        controller: 'DialogController',
        templateUrl: 'app/main/create.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        clickOutsideToClose:false,
        locals: {
          articleTitle: 'Create'
        }
      })
      $mdDialog.show($scope.dialogStack[$scope.dialogStack.length-1])
      .then(function(answer) {
        
      }, function() {
        
      })
    }
    $scope.showArticle = function(id, $event) {
      $scope.dialogStack.push({
        scope:$scope,
        preserveScope:true,
        controller: 'ViewController',
        templateUrl: 'app/main/view.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        clickOutsideToClose:false,
        locals: {
          articleId: id
        }
      })

      $mdDialog.show($scope.dialogStack[$scope.dialogStack.length-1])
      .then(function(){

      }, function(ret) {

      })
    }
    $scope.youtubeUrl = null

    $scope.addYoutube = function(url) {
      $scope.youtubeUrl = url
    }
    $scope.dataload()
  })

.controller('DialogController', function($scope, $mdDialog, $http, flowFactory, articleTitle) {
  console.log('articleTitle', articleTitle)
  $scope.articleTitle = articleTitle
  $scope.title = "타이틀 입력"
  $scope.items = []

  $scope.create = function() {
    $http.post('/api/uploads', 
      {
        title: $scope.title, 
        items: $scope.items,
      })
    .then(function (res) {
      $scope.dialogStack.pop()
      $mdDialog.hide()
      $scope.dataload()
    }, function (error) {
      console.log(error)

    })
  }
  $scope.getTmpFileName = function ($file, $message, $index) {
    console.log('getTmpFileName', $message, $index)
    $scope.items[$index].tmpFileName = $message
  }
  $scope.add = function () {
    $scope.items.push({
      content:"",
      tmpFileName:""
    })
  }

  $scope.add()
})

.controller('ViewController', function ($scope, $mdDialog, $http, articleId) {
  $scope.article = null
  
  $http.get('/api/uploads/'+articleId)
  .then(function (article) {
    $scope.article = article.data
  }, function () {

  })

  $scope.challenge = function (id, $event) {
    $scope.dialogStack.push({
      scope:$scope,
      preserveScope:true,
      controller: 'ChallengeController',
      templateUrl: 'app/main/create.html',
      parent: angular.element(document.body),
      targetEvent: $event,
      clickOutsideToClose:false,
      locals: {
        articleTitle: 'Challenge',
        articleId: id
      }
    })
    $mdDialog.show($scope.dialogStack[$scope.dialogStack.length-1])
    .then( function () {
    }, function () {

    })
  }
})
.controller('ChallengeController', function ($scope, $mdDialog, $http, articleId, articleTitle) {
  $scope.articleTitle = articleTitle
  $scope.articleId = articleId
})