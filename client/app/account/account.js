'use strict';

angular.module('ambestApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('login', {
				url: '/login',
				// views:{
					// 'account':{
						templateUrl: 'app/account/login/login.html',
						controller: 'LoginCtrl'
					// }
				// }
			})
			.state('signup', {
				url: '/signup',
				// views:{
					// 'account':{
						templateUrl: 'app/account/signup/signup.html',
						controller: 'SignupCtrl'
					// }
				// }
			})
			.state('settings', {
				url: '/settings',
				authenticate: true,
				// views:{
					// 'account':{
						templateUrl: 'app/account/settings/settings.html',
						controller: 'SettingsCtrl',
					// }
				// }
			});
	});