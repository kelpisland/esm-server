'use strict';

angular.module('projects')
	// EAO
	.controller('controllerEAOProjects', controllerEAOProjects);
// -----------------------------------------------------------------------------------
//
// CONTROLLER: EAO Projects Main
//
// -----------------------------------------------------------------------------------
controllerEAOProjects.$inject = ['$scope', '$state', 'Projects', '_'];
/* @ngInject */
function controllerEAOProjects($scope, $state, Projects, _) {
	var vm = this;

	vm.intakes = [];
	vm.projects = [];
	vm.filter = {};
	
	// get projects
	Projects.getProjects().then( function(res) {
		vm.projects = res.data;
		// _.each( res.data, function( project, idx ) {
			// if (!project.stream || project.stream === '') {
			// 	// the project becomes an intake and the stream needs to be defined.
			// 	vm.intakes.push(project);
			// } else {
			// 	// the project is already in a stream, show in the ongoing list.
			// 	vm.projects.push(project);
			// }
		// });
	});



	// panel sort maps fields to names, when clicked the associated table sorts accordingly
	vm.panelSort = [
		{'field': 'name', 'name':'Name'},
		{'field': 'status', 'name':'Status'},	
		{'field': 'dateUpdated', 'name':'Date Updated'},
		{'field': 'dateCreate', 'name':'Date Created'}
	];

}        
