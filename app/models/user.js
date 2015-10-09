//user model 
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs'); 

//define schema for admin user 

var userSchema = mongoose.Schema({
	local: {
		email: String, 
		password: String
	}
}); 

//add methods to the user schema 
userSchema.methods.generateHash = function(password){
	//turn password string into hash
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

//check if password is valid
userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
}

//finalise model creation and expose externally to our app 
module.exports = mongoose.model('User', userSchema);
