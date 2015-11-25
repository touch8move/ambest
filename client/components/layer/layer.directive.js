'use strict';

angular.module('ambestApp')
	.directive('dhLayer', function () {
		return {
			restrict: 'E',
			transclude: true,
			scope: {
				title: '@'
			},
			template: 	'<div class="dh-layer">'+
							// '<dh-title title="title"></dh-title>' +
							// '<md-content class="newdiv-content">' +
							'<ng-transclude></ng-transclude>' +
							// '</md-content>' +
						'</div>'
		}	
	})
