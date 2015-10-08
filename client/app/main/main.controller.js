'use strict';

angular.module('ambestApp')
  .controller('MainCtrl', function ($scope, $http, socket, $mdDialog) {

    // $scope.$on('$destroy', function () {
    //   socket.unsyncUpdates('thing');
    // });

    $scope.uploads = []
    $scope.dataload = function () {
      $http.get('/api/uploads')
      .then(function (list) {
        $scope.uploads = list.data
      })
    }
    $scope.showAdvanced = function(ev) {
      $mdDialog.show({
        scope:$scope,
        preserveScope:true,
        controller: 'DialogController',
        templateUrl: 'app/main/create.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        locals: {
          articleTitle: 'Create'
        }
      })
      .then(function(answer) {
        
      }, function() {
        
      })
    }
    $scope.showArticle = function(id, ev) {
      $mdDialog.show({
        scope:$scope,
        preserveScope:true,
        controller: 'ViewController',
        templateUrl: 'app/main/view.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        locals: {
          articleId: id
        }
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

  
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.create = function() {
    $http.post('/api/uploads', 
      {
        title: $scope.title, 
        items: $scope.items,
      })
    .then(function (res) {
      // console.log(res.data)
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
  // console.log('articleId', articleId)
  $http.get('/api/uploads/'+articleId)
  .then(function (article) {
    $scope.article = article.data
  }, function () {

  })

  $scope.cancel = function() {
    $mdDialog.cancel();
  }
  $scope.challenge = function (id, ev) {
    $mdDialog.show({
      scope:$scope,
      preserveScope:true,
      controller: 'ChallengeController',
      templateUrl: 'app/main/view.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      locals: {
        articleTitle: 'Challenge',
        articleId: id
      }
    })
  }
})
.controller('ChallengeController', function ($scope, $mdDialog, $http, articleTitle) {
  $scope.articleTitle = articleTitle
})