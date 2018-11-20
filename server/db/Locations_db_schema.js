/**

  _____                      _              _ _ _     _   _     _        __ _ _      
 |  __ \                    | |            | (_) |   | | | |   (_)      / _(_) |     
 | |  | | ___    _ __   ___ | |_    ___  __| |_| |_  | |_| |__  _ ___  | |_ _| | ___ 
 | |  | |/ _ \  | '_ \ / _ \| __|  / _ \/ _` | | __| | __| '_ \| / __| |  _| | |/ _ \
 | |__| | (_) | | | | | (_) | |_  |  __/ (_| | | |_  | |_| | | | \__ \ | | | | |  __/
 |_____/ \___/  |_| |_|\___/ \__|  \___|\__,_|_|\__|  \__|_| |_|_|___/ |_| |_|_|\___|
                                                                                     
                                                                                   
 *  DO NOT EDIT HIS FILE!!
 * 
 *  FOR CUSTOMIZE DB SCHEMA PLEASE EDIT db/Locations_db_customSchema.js
 * 
 *  -- THIS FILE WILL BE OVERWRITTEN ON THE NEXT EASYDEV'S CODE GENERATION --
 * 
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const createUser = require('../security/security.js');

const db_Locations_db_schema = [];
const db_Locations_db = [];

/**
 * SCHEMA DB Locations_db
 */



 /**
  * Place
  */
db_Locations_db_schema.Place = new mongoose.Schema({
	latitude: {
		type: 'Number', 
		required : true
	},
	longitude: {
		type: 'Number', 
		required : true
	},
	name: {
		type: 'String'
	},
	//RELATIONS
	
	
	//EXTERNAL RELATIONS
	/*
	*/
});


 /**
  * User
  */
db_Locations_db_schema.User = new mongoose.Schema({
	mail: {
		type: 'String'
	},
	name: {
		type: 'String'
	},
	password: {
		type: 'String', 
		required : true
	},
	roles: [{
		type: 'String'
	}],
	surname: {
		type: 'String'
	},
	username: {
		type: 'String', 
		required : true
	},
	//RELATIONS
	
	
	//EXTERNAL RELATIONS
	/*
	*/
});



// Import schema customization
require('./Locations_db_customSchema.js');
var Locations_db_model = require('./Locations_db_crud.js');

// Declare mongoose model

db_Locations_db.Place = Locations_db_model.connection.model('Place', db_Locations_db_schema.Place );
db_Locations_db.User = Locations_db_model.connection.model('User', db_Locations_db_schema.User );

module.exports = db_Locations_db;

// Create ADMIN user if does not exist
createUser.createUser();
