'use strict';

angular.module('ambestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('articleCreate', {
        url: '/article/create',
        views:{
          'create': {
            templateUrl: 'app/article/create/create.html',
            controller: 'ArticleCreateCtrl'
          }
        }
      })
      .state('articleView', {
        url: '/article/view/:id',
        views:{
          'articleViews':{
            templateUrl: 'app/article/view/view.html',
            controller: 'ArticleViewCtrl'
          }
        }
      })
      .state('articleList', {
        url: '/',
        views:{
          'list':{
            templateUrl: 'app/article/list/list.html',
            controller: 'ArticleListCtrl'
          }
        }
      })
      .state('articleEdit', {
        url: '/article/edit/:id',
        templateUrl: 'app/article/edit/edit.html',
        controller: 'ArticleEditCtrl'
      })
  })