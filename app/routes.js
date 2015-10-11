var routes = function(app, passport){
    //check if logged in function
    function isLoggedIn(req, res, next){
      // if user is authenticated in the session, carry on
      if(req.isAuthenticated())
        return next();

      //if they are not authenticted then redrect them to home
      res.redirect('/');
      
    }

    //home page
    app.get('/', function(req, res){
      res.render('index');
    });

    //login page 
    app.get('/login', function(req, res){
      if(req.isAuthenticated())
        res.redirect('/dashboard');

      res.render('login', { message: req.flash('loginMessage') });
    });

    //process the login form 
    app.post('/login',  passport.authenticate('local-login', {
        successRedirect : '/dashboard', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/signup', function(req, res){
      //render the signup page and pass any message via flash
      res.render('signup', { message: req.flash('signupMessage') });
    });

    //process the sign up form 
    app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/profile', 
      failureRedirect : '/signup,', 
      failureFlash : true
    }));

    //profile page 
    app.get('/profile', isLoggedIn, function(req, res){
      res.render('profile', {
        user: req.user
      });
    });

    app.get('/logout', function(req, res){
      req.logout();//this method provided by passport to logout the user
      res.redirect('/');
    });

    app.get('/dashboard', isLoggedIn, function(req, res){
      res.render('dashboard', {
        user: req.user
      });
    });


}


module.exports = routes; 