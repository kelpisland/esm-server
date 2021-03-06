'use strict';
// =========================================================================
//
// Routes for Access Control Management
//
// =========================================================================
// var policy     = require ('../policies/project.policy');
var controller = require ('../controllers/core.access.controller');
var helpers    = require ('../controllers/core.helpers.controller');


module.exports = function (app) {
	//project set up new stream
	app.route ('/api/access/setall/resource/:resourceId')
		// .all (true)
		.put (function (req, res) {
			// console.log (req);
			// helpers.sendErrorMessage (res, 'did this work?');
			// return;
			controller.setResourcePermissions (req.accessResource, req.body, function (err) {
				if (err) helpers.sendError (res, err);
				else helpers.sendData (res, {message:'OK'});
			});
		});


	app.param ('resourceId', function (req, res, next, id) {
		// console.log ('id = ',id);
		req.accessResource = id;
		next ();
	});
};

