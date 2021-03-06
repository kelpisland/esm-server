#!/bin/bash
# echo "Name of module (lowercase) => "
# read NAME
# echo "Plural name (lowercase) => "
# read PLURAL
# echo "Model name (capitalized camel) => "
# read MODEL
NAME=$1
PLURAL=$2
MODEL=$3
echo "Creating module $NAME $PLURAL $MODEL";
mkdir modules/$PLURAL
mkdir modules/$PLURAL/server
mkdir modules/$PLURAL/server/controllers
mkdir modules/$PLURAL/server/policies
mkdir modules/$PLURAL/server/models
mkdir modules/$PLURAL/server/routes

cat > modules/$PLURAL/server/controllers/$NAME.controller.js <<EOFC
'use strict';
// =========================================================================
//
// Controller for $PLURAL
//
// =========================================================================
var path     = require('path');
var mongoose = require ('mongoose');
var CRUD     = require (path.resolve('./modules/core/server/controllers/core.crud.controller'));
var Model    = mongoose.model ('$MODEL');

var crud = new CRUD (Model);
// -------------------------------------------------------------------------
//
// Basic CRUD
//
// -------------------------------------------------------------------------
exports.new    = crud.new    ();
exports.create = crud.create ();
exports.read   = crud.read   ();
exports.update = crud.update ();
exports.delete = crud.delete ();
exports.list   = crud.list   ();
exports.getObject   = crud.getObject   ();

EOFC

cat > modules/$PLURAL/server/models/$NAME.model.js <<EOFM
'use strict';
// =========================================================================
//
// Model for $PLURAL
//
// =========================================================================
var mongoose     = require ('mongoose');
var Schema       = mongoose.Schema;

var ${MODEL}Schema  = new Schema ({
	code        : { type:String, default:'code' },
	name        : { type:String, default:'New $NAME' },
	description : { type:String, default:'New $NAME' }
});

var $MODEL = mongoose.model ('$MODEL', ${MODEL}Schema);

module.exports = $MODEL;

EOFM

cat > modules/$PLURAL/server/routes/$NAME.routes.js <<EOFR
'use strict';
// =========================================================================
//
// Routes for $PLURAL
//
// =========================================================================
var policy     = require ('../policies/$NAME.policy');
var controller = require ('../controllers/$NAME.controller');

module.exports = function (app) {
	//
	// collection routes
	//
	app.route ('/api/$NAME').all (policy.isAllowed)
		.get  (controller.list)
		.post (controller.create);
	//
	// model routes
	//
	app.route ('/api/$NAME/:${NAME}').all (policy.isAllowed)
		.get    (controller.read)
		.put    (controller.update)
		.delete (controller.delete);
	app.route ('/api/new/$NAME').all (policy.isAllowed)
		.get (controller.new);
	//
	// middleware to auto-fetch parameter
	//
	app.param ('${NAME}', controller.getObject);
	//app.param ('${NAME}Id', controller.getId);
};

EOFR

cat > modules/$PLURAL/server/policies/$NAME.policy.js <<EOFP
'use strict';
// =========================================================================
//
// Policies for $PLURAL
//
// =========================================================================
var acl  = require ('acl');
acl      = new acl (new acl.memoryBackend ());
var helpers  = require (require('path').resolve('./modules/core/server/controllers/core.helpers.controller'));

exports.invokeRolesPolicies = function () {
	helpers.setCRUDPermissions (acl, '${NAME}');
};

exports.isAllowed = helpers.isAllowed (acl);


EOFP

./link.sh
