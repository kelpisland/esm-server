'use strict';
// =========================================================================
//
// Model for bucket requirements
//
// this links a bucket to all of its requirements
//
// =========================================================================
var mongoose     = require ('mongoose');
var Schema       = mongoose.Schema;

var IntegrationSchema  = new Schema ({
	module        : { type:String , required:true, unique:true }
});

var Integration = mongoose.model ('Integration', IntegrationSchema);

module.exports = Integration;

