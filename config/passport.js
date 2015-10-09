//load local strategy 
var LocalStrategy = require('passport-local').Strategy;

//load the user model 
var User = require('../app/models/user');

//the rest of the function needs to be exposed so that we can use it elsewhere 
module.exports = function(passport){
	//passport session setup
	//we need this for persistent login sessions so that user doesnt have to enter password each time
	//passport needs to store information and then retreive that information on each request 

	//serialize 
	passport.serializeUser(function(user, done){
		done(null, user.id); 
	});

  //deserialize user 
  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      done(err, user);
    });
  });

  //local signup setup

  passport.use('local-signup', new LocalStrategy({
    //change username to email
    usernameField: 'email',
    passwordield: 'password', 
    passReqToCallback: true //this gives access to entire request object to the callback function
  }, 
  function(req, email, password, done){
         //asynchronous
        // User.findOne wont fire until data is sent back
        process.nextTick(function(){
          // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email': email }, function(err, user){
          // if there are any errors, return the error
          if(err)
            return done(err); 
          // check to see if theres already a user with that email
          if(user){
            return done(null, false, req.flash('signupMessage', 'That email is already taken'))
          } else {
            // if there is no user with that email
                // create the user
            var newUser = new User(); 
            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);

            //save the new user to DB 
            newUser.save(function(err, user){
              if(err) throw err; 
              return done(null, newUser);
            }); 
          }
        });
        })
  }));


  //local login 
  passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user);
        });

    }));




}