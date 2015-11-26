'use strict';

angular.module('ambestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('create', {
        url: '/create',
        templateUrl: 'app/envy/create/create.html',
        controller: 'CreateCtrl'
      });
  });