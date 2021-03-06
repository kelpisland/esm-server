'use strict';

angular.module('roles')
    .directive('modalPermissionMatrix', directiveModalPermissionMatrix);
    
// -----------------------------------------------------------------------------------
//
// DIRECTIVE: Projects Quicklinks
//
// -----------------------------------------------------------------------------------
directiveModalPermissionMatrix.$inject = ['$modal'];
/* @ngInject */
function directiveModalPermissionMatrix($modal) {
	var directive = {
		restrict:'A',
		scope : {
			targetObject: '=',
			targetObjectType: '@'
		},
		link : function(scope, element, attrs) {
			element.on('click', function() {
				var modalPermissionMatrix = $modal.open({
					animation: true,
					templateUrl: 'modules/roles/client/views/partials/modal-permission-matrix.html',
					controller: 'controllerPermissionMatrix',
					controllerAs: 'permMatrix',
					scope: scope,
					size: 'lg',
					resolve: {
						rTargetObject: function() { return scope.targetObject; },
						rTargetObjectType: function() { return scope.targetObjectType; }						
					}
				});
				modalPermissionMatrix.result.then(function () {}, function () {});
			});
		}
    };
    return directive;
}

