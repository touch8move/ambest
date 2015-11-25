'use strict';

angular.module('ambestApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('tabs', {
				url: '/tab',
				abstract: true,
				// views:{
					// 'list':{
						templateUrl: 'app/article/list/list_tabs.html',
						controller: 'ArticleListCtrl'
					// }
				// }
			})
			.state('tabs.articleListFresh', {
				url: '/fresh',
				views:{
					'article':{
						templateUrl: 'app/article/list/list.html',
						controller: 'ArticleListFreshCtrl'
					}
				}
			})
			.state('tabs.articleListHot', {
				url: '/hot',
				views:{
					'article':{
						templateUrl: 'app/article/list/list_hot.html',
						controller: 'ArticleListHotCtrl'
					}
				}
			})
			.state('tabs.articleListFav', {
				url: '/fav',
				views:{
					'article':{
						templateUrl: 'app/article/list/list_favorite.html',
						controller: 'ArticleListFavCtrl'
					}
				}
			})
			.state('articleCreate', {
				url: '/article/create',
				authenticate:true,
				// views:{
					// 'create': {
						templateUrl: 'app/article/create/create.html',
						controller: 'ArticleCreateCtrl',
					// }
				// }
			})
			.state('articleView', {
				url: '/article/view/:id',
				// views:{
					// 'articleViews':{
						templateUrl: 'app/article/view/view.html',
						controller: 'ArticleViewCtrl'
					// }
				// }
			})
			// .state('articleEdit', {
			// 	url: '/article/edit/:id',
			// 	authenticate:true,
			// 	// views: {
			// 		// 'articleEdit':{
			// 			templateUrl: 'app/article/edit/edit.html',
			// 			controller: 'ArticleEditCtrl'
			// 		// }
			// 	// }
			// })
	})