var routes = function(app, passport){
var Class = require('../app/models/classes');
var Student = require('../app/models/student');

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
      successRedirect : '/dashboard', 
      failureRedirect : '/signup', 
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

    //add new student
    app.get('/addstudent', isLoggedIn, function(req, res){
      //db classes check
      var checkClass = Class.find(function(err, Class){
        if(err) throw err;
        console.log(Class);

        if(Class.length === 0){
          //req.flash('signupMessage', 'That email is already taken')
          req.flash('addClassMessage', 'Add class first');
          res.render('addclass', { message: req.flash('addClassMessage') });
        } else {
          res.render('addstudent', {message: ''});
        }
        
      });

    });

    app.get('/addclass', isLoggedIn, function(req, res){
      res.render('addclass');
    });

    app.post('/addclass', isLoggedIn, function(req, res){
      //create new class instance
      var newClass = new Class(); 
      newClass.name = req.body.classname;

      newClass.save(function(err, newClass){
        if(err) throw err; 
        console.log(newClass);
      });

      res.redirect('/dashboard')
    });

    //list all of the available class from classes collection in DB
    app.get('/getclasses', isLoggedIn, function(req, res){
      //tap into db
      var getClass = Class.find(function(err, result){
        if(err) throw err; 
        console.log(result);
        res.send(result);
      });
    });

    app.post('/addstudent', isLoggedIn, function(req, res){
      console.log(req.body.selectoptions);
      var studentDetails = {}; 

      studentDetails.firstname = req.body.firstname; 
      studentDetails.lastname = req.body.lastname; 
      studentDetails.contact = req.body.contact; 
      studentDetails.address = req.body.address; 
      studentDetails.Parent = req.body.parent; 
      studentDetails.medical = req.body.medical; 
      studentDetails.Class = req.body.selectoptions; 

      var newStudent = new Student(studentDetails);  
      newStudent.save(function(err, student){
        if (err) throw err; 
        console.log(student); 
       res.render('addstudent', {message: 'Student added successfully'});
      });
    });

    app.post('/searchfirstname', isLoggedIn, function(req, res){
      //grab search value
      var firstname = req.body.searchfirstname;
      console.log(firstname);
      //search students collection
      Student.find({ firstname: firstname}, function (err, student) {
      if(err) throw err;
      console.log(student);
      res.render('search-result', {student: student});
      });
    });

    app.get('/student/:id', function(req, res){
      console.log(req.params.id);
      var id = req.params.id; 
      Student.find({ _id:  id}, function(err, student){
        if(err) throw err;
        console.log(student); 
        res.render('student', {student: student });
      }); 
    });

    app.post('/searchclass', function(req, res){
      //Get list of classes 
      var className = req.body.searchclass;
      console.log(req.body.searchclass);
      var ajaxCall = req.body.ajax;
      Student.find({ Class: className }, function(err, ClassName){
        if(err) throw err;
        console.log(ClassName);
        //if ajax call then send back some data for redirect
        if(ajaxCall){
          res.json({ message: 'success', student: ClassName });
          // res.render('class-result-view', {student: ClassName});
        } else {
        res.render('class-result-view', {student: ClassName});
      }
      });
    });
    
}

module.exports = routes; 