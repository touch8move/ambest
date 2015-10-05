'use strict';

angular.module('ambestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('threads', {
        url: '/threads',
        templateUrl: 'app/threads/threads.html',
        controller: 'ThreadsCtrl'
      });
  });