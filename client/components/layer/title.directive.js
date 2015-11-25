'use strict';

angular.module('ambestApp')
	.directive('dhTitle', function () { 
		return {
			restrict: 'E',
			scope: {
				title: '@',
			},
			template: 
			'<header scroll-y-offset-element class="header header-fixed">'+
				'<md-toolbar>'+
					'<div class="md-toolbar-tools">'+
						'<md-button class="md-icon-button" aria-label="close" ng-click="close()">'+
							'<ng-md-icon icon="clear" style="fill:#ffffff"></ng-md-icon>'+
						'</md-button>'+
						'<h2>'+title+'</h2>'+
						'<span flex=""></span>'+
						// '<ng-transclude></ng-transclude>' +
					'</div>'+
				'</md-toolbar>'+
			'</header>',
			link: function (scope, element, attrs) {
				scope.close = function () {
					scope.$emit('dh-close')
				}
			}
		}
	})
