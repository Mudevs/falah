//classes model 
var mongoose = require('mongoose');
 

//define schema for class model 

var classSchema = mongoose.Schema({
	name: String}, 
	{ collection: 'classes' }); 

//finalise model creation and expose externally to our app 
module.exports = mongoose.model('Class', classSchema);
