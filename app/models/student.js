//user model 
var mongoose = require('mongoose');

//define schema for student
var userStudent = mongoose.Schema({
	firstname: String,
	lastname: String,
	contact: Number, 
	address: String,
	parent: String,
	medical: String,
	Class: String
}, {collection: 'students'}); 

//finalise model creation and expose externally to our app 
module.exports = mongoose.model('Student', userStudent);
