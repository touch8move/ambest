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
        views: {
          'envy': {
            templateUrl: 'app/envy/list/list_fresh.html',
            controller: 'EnvyListFreshCtrl'
          }
        }
      })
      .state('envyCreate', {
        url: '/envy/create',
        authenticate:true,
        templateUrl: 'app/envy/create/create.html',
        controller: 'EnvyCreateCtrl'
      })
      .state('envyView', {
        url: '/envy/view/:id',
        templateUrl: 'app/envy/view/view.html',
        controller: 'EnvyViewCtrl'
      })
      .state('envyEdit', {
        url: '/envy/edit/:id',
        authenticate:true,
        templateUrl: 'app/envy/edit/edit.html',
        controller: 'EnvyEditCtrl'
      })
  })