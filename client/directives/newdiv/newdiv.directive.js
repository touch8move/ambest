angular.module('ambestApp')
	.directive('callNewDiv', function ($compile) {
		return {
			// restrict: 'E',
			scope: {
				text: '@',
				includeUrl: '@',
				title: '@',
			},
			transclude:true,
			template: '<p ng-click="addNewDiv()">{{text}}<ng-transclude></ng-transclude></p>',
			// controller: function ($scope) {
			// 	var el
			// 	$scope.addNewDiv = function () {
			// 		// angular.element(document.getElementsByTagName('md-content')).css('overflow', 'hidden')

			// 		el = $compile('<div class="newdiv">'+
			// 						'<header scroll-y-offset-element class="header header-fixed">'+
			// 							'<md-toolbar>'+
			// 								'<div class="md-toolbar-tools">'+
			// 									'<md-button class="md-icon-button" aria-label="close" ng-click="close()">'+
			// 										'<ng-md-icon icon="clear" style="fill:#ffffff"></ng-md-icon>'+
			// 									'</md-button>'+
			// 									'<h2>{{title}}</h2>'+
			// 									'<span flex=""></span>'+
			// 								'</div>'+
			// 							'</md-toolbar>'+
			// 						'</header>'+
			// 						'<ng-include src="includeUrl"></ng-include>'+
			// 					'</div>')($scope)
			// 		angular.element(document.body).append(el)
			// 	}
			// },
			link: function (scope, elt, attrs) {
				scope.close = function () {
					var newdivs = angular.element(document.getElementsByClassName('newdiv'))
					if (newdivs.length>0) {
						var remove = newdivs.splice(newdivs.length-1, 1)
						angular.element(remove).remove()
					}
					// angular.element(elt.html).remove()
				}
				scope.addNewDiv = function () {
					// console.log(scope.includeUrl)
					var el = $compile(
					'<div class="newdiv">'+
						'<header scroll-y-offset-element class="header header-fixed">'+
							'<md-toolbar>'+
								'<div class="md-toolbar-tools">'+
									'<md-button class="md-icon-button" aria-label="close" ng-click="close()">'+
										'<ng-md-icon icon="clear" style="fill:#ffffff"></ng-md-icon>'+
									'</md-button>'+
									'<h2>{{title}}</h2>'+
									'<span flex=""></span>'+
								'</div>'+
							'</md-toolbar>'+
						'</header>'+
						'<md-content class="newdiv-content">' +
							// '<md-button class="md-primary md-icon-button" aria-label="create">'+
							// 	'<call-new-div title="Create" includeUrl="">'+
							// 		'<ng-md-icon icon="create" style="fill:#ffffff"></ng-md-icon>'+
							// 	'</call-new-div>'+
							// '</md-button>'+
							'<ng-include class="newdiv-content" src="includeUrl"></ng-include>'+
							'</md-content>' +
					'</div>')(scope)
					angular.element(document.body).append(el)
				}
				scope.$on('div_close', function () {
					scope.close()
				})
			}
		}
	})