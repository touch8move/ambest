'use strict';

angular.module('ambestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('envylist', {
        url: '/envy',
        abstract: true,
        templateUrl: 'app/envy/list/list_tabs.html',
        controller: 'EnvyListCtrl'
      })
      .state('envylist.fresh', {
        url: '/fresh',
        view: {
          'envy': {
            templateUrl: 'app/envy/list/list_fresh.html',
            controller: 'EnvyListFresh'
          }
        }
      })
  })