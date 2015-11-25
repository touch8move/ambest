'use strict';

angular.module('ambestApp', [
	'ngAnimate',
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'btford.socket-io',
	'ui.router',
	'ui.bootstrap',
	'ngMaterial',
	'flow',
	'ngMdIcons',
])
	.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $provide) {
		// $provide.decorator('$uiViewScroll', function ($delegate) {
		// 	return function (uiViewElement) {
		// 		var top = uiViewElement.getBoundingClientRect().top;
		// 		window.scrollTo(0, (top - 30));
		// 		// Or some other custom behaviour...
		// 	}
		// })
		$urlRouterProvider
			.otherwise('/tab/hot');
		// $stateProvider
		// 	.state('Nav', {
		// 		views:{
		// 			'nav': {
		// 				templateUrl: 'components/navbar/navbar.html',
		// 				controller: 'NavCtrl'
		// 			}
		// 		}
		// 	})
		// $locationProvider.html5Mode(true);
		$httpProvider.interceptors.push('authInterceptor');
	})

	.factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
		return {
			// Add authorization token to headers
			request: function (config) {
				config.headers = config.headers || {};
				if ($cookieStore.get('token')) {
					config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
				}
				return config;
			},

			// Intercept 401s and redirect you to login
			responseError: function(response) {
				if(response.status === 401) {
					$location.path('/login');
					// remove any stale tokens
					$cookieStore.remove('token');
					return $q.reject(response);
				}
				else {
					return $q.reject(response);
				}
			}
		}
	})
	.factory('Articles', function ($resource) {
		return $resource('/api/articles/:id', {
			id: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		})
	})
	.factory('Challenges', function ($resource) {
		return $resource('/api/challenges/:id/:controller', {
			id: '@_id',
		})
	})
	.factory('Likes', function ($resource) {
		return $resource('/api/likes/:id/:controller', {
			id: '@_id'
		})
	})
	.factory('Replys', function ($resource) {
		return $resource('/api/replys/:id', {
			id: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		})
	})
	.factory('CardInfos', function ($resource) {
		return $resource('/api/cardInfos/:type')
	})
	
	.run(function ($rootScope, $location, Auth, $templateCache) {
		// Redirect to login if route requires auth and you're not logged in
		$rootScope.$on('$stateChangeStart', function (event, next) {
			Auth.isLoggedInAsync(function(loggedIn) {
				if (next.authenticate && !loggedIn) {
					// event.preventDefault();
					$location.path('/login');
				}
			})
		})

		// $rootScope.$on('$stateChangeSuccess',function(){
		//     $("html, body").animate({ scrollTop: 0 }, 0);
		// })
	})

	.config(function (flowFactoryProvider) {
		flowFactoryProvider.defaults = {
				target: '/api/files/upload',
				singleFile: true,
				permanentErrors:[404, 500, 501]
		};
		// You can also set default events:
		flowFactoryProvider.on('catchAll', function (event) {
			// ...
		});
		// Can be used with different implementations of Flow.js
		// flowFactoryProvider.factory = fustyFlowFactory;
})
