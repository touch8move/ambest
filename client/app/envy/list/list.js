'use strict';

angular.module('ambestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('list', {
        url: '/list',
        templateUrl: 'app/envy/list/list.html',
        controller: 'ListCtrl'
      });
  });