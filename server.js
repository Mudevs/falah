var express = require('express');
var app = express(); 
var port = process.env.PORT || 8080; 
var mongoose = require('mongoose');
var passport = require('passport');
// var flash = require('express-flash');
var flash = require('connect-flash');
var routes = require('./app/routes.js'); 
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./app/routes.js');
var multer = require('multer');  

//configure the database
var configDB = require('./config/database.js');

//connect to mongoDB 
mongoose.connect(configDB.url);

require('./config/passport.js')(passport); //pass passport to the function

//setup express
app.use(morgan('dev')); //logs every request to the console
app.use(cookieParser()); //creates req.cookies - needed for sessions
app.use(bodyParser()); //lets us read data from forms - creates req.body object
app.use(express.static('public'));

//set up view engine 
app.set('view engine', 'ejs'); //uses ejs for templating

//configurations for passport to work 
app.use(session({ secret: 'falahstudentmanagement' }));//sets up session secret for signing cookies
app.use(passport.initialize()); //initializes passport
app.use(passport.session()); //needed for setting up sessions for same user
app.use(flash()); //use connect flash module for flash messages to be sent to user
// app.use(multer());

//routes for app 
routes(app, passport);
//require('./app/routes.js')(app, passport); //load the routes and pass in app and configured passport

app.listen(port, function(){
	console.log('server running on port: ' + port);
}); 

