'use strict'
angular.module('ambestApp')
	.factory('dhLayerFactory', function ($http, $rootScope, $compile) {
		//layer stack
		$rootScope.$on('dh-close', close)
		
		return {
			newLayer : function (url) {
				var el = $compile(
					'<dh-layer class="dh-layer">' +
						 +
					'</dh-layer>')($rootScope)
				angular.element(document.body).append(el)
			},
			close : function () {
				var dhLayers = angular.element(document.getElementsByTagName('dh-layer'))
				if (dhLayers.length > 0) {
					console.log(dhLayers)
					var remove = dhLayers.splice(dhLayers.length-1, 1)
					angular.element(remove).remove()
				}
			},
		}
	})