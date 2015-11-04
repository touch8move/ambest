'use strict'

angular.module('ambestApp')
.config(function ($stateProvider) {
	$stateProvider
		.state('challengeCreate', {
			url: '/challenge/create/:articleId',
			views:{
				'challengeCreate':{
					templateUrl: 'app/challenge/create/create.html',
					controller: 'ChallengeCreateCtrl'
				}
			}
		})
		.state('challengeView', {
			url: '/challenge/view/:id',
			views: {
				'challengeViews': {
					templateUrl: 'app/challenge/view/view.html',
					controller: 'ChallengeViewCtrl'
				}
			}
		})
		.state('challengeEdit', {
			url: '/challenge/edit/:articleId/:id',
			views: {
				'challengeEdit': {
					templateUrl: 'app/challenge/edit/edit.html',
					controller: 'ChallengeEditCtrl'
				}
			}
		})
})