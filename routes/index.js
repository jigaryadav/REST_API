var express = require('express');
var router = express.Router();
 passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');


passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log(username+":"+password);
		return done(null, user="jigar");
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  done(null,id);
});


/* GET home page. */
router.post('/register', function(req, res, next) {
	var email = req.body.email;
	var password = req.body.password;
	var newUser = new User({
		email:email,
		password:password
	});

	User.createUser(newUser,function  (e,r) {
		res.redirect('/login');
	})
});

router.get('/register', function(req, res, next) {
	res.render('register');
});

router.get('/login',function (req,res,next) {
	res.render('login');
})

router.post('/login',passport.authenticate('local',{ successRedirect: '/register',failureRedirect: '/login'}),
	function (req,res,next) {
		console.log('login called');
});

module.exports = router;
