var express = require('express');
var router = express.Router();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var User = require('../models/user');


passport.use(new FacebookStrategy({
    clientID:359116497789278,
    clientSecret:'b752ea1868ab99affc1f8efcbb252f91',
    callbackURL: "http://localhost:3000/facebook/callback",
  },
  function(accessToken, refreshToken, profile, done) {
   	console.log("profile: "+ JSON.stringify(profile));
   	return done(null,user=profile);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  done(null,id);
});

router.get('/',function  (req, res, next) {
	res.render('facebook');
})

router.get('/auth', passport.authenticate('facebook',{scope:['read_stream','email','user_birthday']}));

router.get('/callback',
	passport.authenticate('facebook', { successRedirect: '/register',failureRedirect: '/login' })
);


module.exports = router;
