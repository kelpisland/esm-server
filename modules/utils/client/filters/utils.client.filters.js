'use strict';

angular.module('utils')
	.filter('advancedFilter', filterAdvancedFilter)
	.filter('projectPhaseContributor', filterProjectPhaseContributor)
	.filter('kebab', filterKebab)
	.filter('contains', filterContains)
	.filter('projectBucketNotComplete', filterProjectBucketNotComplete)
	.filter('projects', filterProjects)
	.filter('isInTheFuture', filterIsInTheFuture)
	.filter('isInThePast', filterIsInThePast)
	.filter('max15Words', filterMax15Words)
	.filter('safeHtml', filterSafeHtml)
	.filter('titleCase', filterTitleCase)
	.filter('chunk', filterChunk);

// -----------------------------------------------------------------------------------
//
// FILTER: Advanced Filter, search for each keyword
//
// -----------------------------------------------------------------------------------
filterAdvancedFilter.$inject = ['$filter'];
/* @ngInject */
function filterAdvancedFilter($filter) {
	return function(data, text){
    		if (text) {
			var textArr = text.split(' ');
			angular.forEach(textArr, function(test){
				if(test){
					data = $filter('filter')(data, test);
				}
			});
		}
		return data;
	};
}
// -----------------------------------------------------------------------------------
//
// FILTER: Projects Phases - mark up the project to show what group owns it.
//
// -----------------------------------------------------------------------------------
filterProjectPhaseContributor.$inject = ['$filter', '_'];
/* @ngInject */
function filterProjectPhaseContributor($filter, _) {
	return function(input) {
		// var cur = _.findWhere(Global.projectPhases, {name: input});
		// if (cur) {
		// 	if (cur.groups.indexOf( Global.user.type ) !== -1) {
		// 		return true;
		// 	}
		// } 
		return false;
	};
}
// -----------------------------------------------------------------------------------
//
// FILTER: Projects Phases - mark up the project to show what group owns it.
//
// -----------------------------------------------------------------------------------
filterKebab.$inject = ['_'];
/* @ngInject */
function filterKebab(_) {
	return function(input) {
		return _.kebabCase(input);
	};
}
// -----------------------------------------------------------------------------------
//
// FILTER: Contains - Retuns true or false if string is in.
//
// -----------------------------------------------------------------------------------
filterContains.$inject = ['_'];
/* @ngInject */
function filterContains(_) {
	return function(input, term) {
		return (_.indexOf(input, term) > -1);
	};
}
// -----------------------------------------------------------------------------------
//
// FILTER: Project Buckets - not complete
//
// -----------------------------------------------------------------------------------
filterProjectBucketNotComplete.$inject = ['_'];
/* @ngInject */
function filterProjectBucketNotComplete(_) {
	return function(input) {
		var output = [];
		_.each(input, function(item) {
			if (item.progress < 100) {
				output.push(item);
			}
		});
		return output;
	};
}
// -----------------------------------------------------------------------------------
//
// FILTER: Projects Page, filter  TODO: actually filter something
//
// -----------------------------------------------------------------------------------
filterProjects.$inject = ['_'];
/* @ngInject */
function filterProjects(_) {
	return function(input) {
		var output = [];
		_.each(input, function(item) {
			output.push(item);
		});
		return output;
	};
}    
// -----------------------------------------------------------------------------------
//
// FILTER: Is in the future
// Just take it easy and you'll be fine... and be careful in the future.
//
// -----------------------------------------------------------------------------------
filterIsInTheFuture.$inject = ['_', 'moment'];
/* @ngInject */
function filterIsInTheFuture(_, moment) {
	return function(input) {
		return moment(input) > moment();
	};
}   
// -----------------------------------------------------------------------------------
//
// FILTER: Is in the future
// So tell me Future Boy, who's President of the United States in 1985?
//
// -----------------------------------------------------------------------------------
filterIsInThePast.$inject = ['_', 'moment'];
/* @ngInject */
function filterIsInThePast(_, moment) {
	return function(input) {
		return moment(input) < moment();
	};
}   
// -----------------------------------------------------------------------------------
//
// FILTER: First 15 words
//
// -----------------------------------------------------------------------------------
filterMax15Words.$inject = ['_'];
/* @ngInject */
function filterMax15Words(_) {
	return function(input) {
    	return _.take(_.words(input), 15).join(' ');
    };
}
// -----------------------------------------------------------------------------------
//
// FILTER: Filter to prevent html trust warnings.
//
// -----------------------------------------------------------------------------------
filterSafeHtml.$inject = ['$sce'];
/* @ngInject */
function filterSafeHtml($sce) {
	return function(input) {
    	return $sce.trustAsHtml(input);
    };
}
// -----------------------------------------------------------------------------------
//
// FILTER:Make the string title case
//
// -----------------------------------------------------------------------------------
filterTitleCase.$inject = [];
/* @ngInject */
function filterTitleCase() {
	return function(input) {
		input = input || '';
     	return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	};
}
// -----------------------------------------------------------------------------------
//
// FILTER: Split array into chunks
//
// -----------------------------------------------------------------------------------
filterChunk.$inject = ['_'];
/* @ngInject */
function filterChunk(_) {
	return _.memoize(_.chunk);
}

