'use strict';

angular.module('ambestApp')
  .controller('MainCtrl', function ($scope, $http, socket, $mdDialog, Auth, $location) {

    // $scope.$on('$destroy', function () {
    //   socket.unsyncUpdates('thing');
    // });


    //Auth
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.user = Auth.getCurrentUser();
    $scope.auth = Auth
    $scope.dialogStack = []

    $scope.articles = []


    $scope.cancel = function() {
      $scope.dialogStack.pop()
      
      $mdDialog.cancel();
      if($scope.dialogStack.length > 0) {
        console.log("multi")
        $mdDialog.show($scope.dialogStack[$scope.dialogStack.length-1])
      }
      
    };
    $scope.dataload = function () {
      $http.get('/api/articles')
      .then(function (list) {
        $scope.articles = list.data
      })
    }

    $scope.createArticle = function($event) {
      $location.path('/article/create')
      // if($scope.isLoggedIn()) {
      //   $scope.dialogStack.push({
      //     scope:$scope,
      //     preserveScope:true,
      //     controller: 'DialogController',
      //     templateUrl: 'app/main/create.html',
      //     parent: angular.element(document.body),
      //     targetEvent: $event,
      //     clickOutsideToClose:false,
      //     locals: {
      //       articleTitle: 'Create'
      //     }
      //   })
      //   $mdDialog.show($scope.dialogStack[$scope.dialogStack.length-1])
      //   .then(function(answer) {
          
      //   }, function() {
          
      //   })
      // } else {
      //   $location.path('/login')
      // }
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
    
    $scope.dataload()
  })

.controller('DialogController', function ($scope, $mdDialog, $http, flowFactory, articleTitle, Auth, $location) {
  console.log('articleTitle', articleTitle)
  $scope.articleTitle = articleTitle
  $scope.title = "타이틀 입력"
  $scope.article = {
    title: "",
    context: "",
    items : [{
      content:"",
      tmpFileName:""
    }]
  }

  // $scope.create = function() {
    // if($scope.auth.isLoggedIn()) {
    //   $http.post('/api/challenges', 
    //     {
    //       parentId: "parent",
    //       title: $scope.title, 
    //       // items: $scope.items,
    //       createdBy: Auth.getCurrentUser()._id
    //     })
    //   .then(function (res) {
    //     $scope.dialogStack.pop()
    //     $mdDialog.hide()
    //     $scope.dataload()
    //   }, function (error) {
    //     console.log(error)

    //   })
    // } else {
    //   $location.path('/login')
    // }
  // }

  $scope.create = function () {
    $scope.dialogStack.push({
        scope:$scope,
        preserveScope:true,
        controller: 'ChallengeController',
        templateUrl: 'app/main/challenge.html',
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
  $scope.getTmpFileName = function ($file, $message, $index) {
    // console.log('getTmpFileName', $message, $index)
    $scope.article.items[$index].tmpFileName = $message
  }
  $scope.add = function () {
    $scope.article.items.push({
      content:"",
      tmpFileName:""
    })
  }
})

.controller('ViewController', function ($scope, $mdDialog, $http, articleId, Auth, $location, $mdBottomSheet) {
  $scope.article = null
  $scope.challenges = []
  $scope.articleId = articleId
  $scope.replys = []
  $scope.kools = []

  $scope.isKool = function (challengeId) { 
    if(!challengeId) {
      challengeId = articleId
    }
    $http.get('/api/kool/'+challengeId+'/'+Auth.getCurrentUser._id)
    .then(function(ret) {
      return ret.data
    }, function(err) {
      console.log(err)
    })
  }

  // $scope.kool = function (challengeId) {
  //   if($scope.isLoggedIn()) {
  //     if(!challengeId) {
  //       challengeId = articleId
  //     }

  //     $http.post('/api/kools', {articleId:challengeId, createdBy:Auth.getCurrentUser()._id})
  //     .then(function (ret) {
  //       // 좋아요 버튼 온
  //       $scope.reload()
  //     }, function(err) {
  //       console.log(err)
  //     })  
  //   } else {

  //   }
  // }

  // $scope.delKool = function(challengeId) {
  //   if(!challengeId) {
  //     challengeId = articleId
  //   }

  //   $http.delete('/api/kools', {articleId:challengeId, createdBy: Auth.getCurrentUser()._id})
  //   .then(function(ret) {
  //     $scope.reload()
  //   }, function(err) {
  //     console.log(err)
  //   })
  // }

  // 방
  $scope.reload = function() {
    $http.get('/api/challenges/'+$scope.articleId)
    .then(function (ret) {
      $scope.challenges = ret.data
    }, function (err) {
      console.error(err)
    })
  }
  $scope.reload()
  
  $scope.getReply = function () {
    $http.get('/api/replys/'+articleId)
    .then(function(ret) {
      $scope.replys = ret.data
    }, function (){

    })
  }

  $scope.replyPost = function () {
    if (Auth.isLoggedIn()) {
      $scope.reply.articleId = articleId
      $scope.reply.createdBy = $scope.user
      $http.post('/api/replys', $scope.reply)
      .then(function (ret) {
        $scope.getReply()
        $scope.reply.content = ""
      }, function(err) {
        console.log(err)
      })
    } else {
      $location.path('/login')
    }
  }
  $scope.getReply()

  // $scope.reply = function ($event) {
  //   if (Auth.isLoggedIn()) {
  //     $mdBottomSheet.show({
  //       scope: $scope,
  //       templateUrl: 'app/main/bottomSheet.html',
  //       locals: {
  //         articleId: $scope.articleId
  //       },
  //       parent: angular.element(".dialog"),
  //       controller: function ($scope, $http, Auth, $mdBottomSheet, articleId) {
  //         $scope.replyPost = function () {
  //           if (Auth.isLoggedIn()) {
  //             $scope.reply.articleId = articleId
  //             $scope.reply.createdBy = Auth.getCurrentUser()._id
  //             $http.post('/api/replys', $scope.reply)
  //             .then(function (ret) {
  //               $mdBottomSheet.hide()
  //               $scope.getReply()
  //             }, function(err) {
  //               console.log(err)
  //             })
  //           } else {
  //             $location.path('/login')
  //           }
  //         }
  //       },
  //       targetEvent: $event
  //     }).then(function(ret) {
        
  //     })
  //   } else {
  //     $mdDialog.hide()
  //     $location.path('/login')
  //   }
  // }

  $scope.challenge = function ($event) {
    if(Auth.isLoggedIn()) {
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
          parentId: $scope.articleId
        }
      })
      $mdDialog.show($scope.dialogStack[$scope.dialogStack.length-1])
      .then( function () {
        $scope.dialogStack.pop()
        $mdDialog.hide()
      }, function (err) {

      })
    } else {
      $mdDialog.hide()
      $location.path('/login')
    }
  }
})
.controller('ChallengeController', function ($scope, $mdDialog, $http, parentId, articleTitle, Auth, $location) {
  $scope.articleTitle = articleTitle
  $scope.articleId = articleId
  $scope.items = []
  $scope.add = function () {
    $scope.items.push({
      content:"",
      tmpFileName:""
    })
  }
  $scope.getTmpFileName = function ($file, $message, $index) {
    // console.log('getTmpFileName', $message, $index)
    $scope.items[$index].tmpFileName = $message
  }
  $scope.add()

  $scope.create = function () {
    if(Auth.isLoggedIn()){
      $http.post('/api/challenges', {
        parentId: $scope.parentId,
        title: $scope.title,
        items: $scope.items,
        createdBy: Auth.getCurrentUser()._id
      })
      .then( function () {
        $scope.dialogStack.pop()
        $mdDialog.hide()
      }, function () {

      })
    } else {
      $mdDialog.hide()
      $location.path('/login')
    }
  }
})