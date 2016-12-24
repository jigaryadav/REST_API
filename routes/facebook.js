var express = require('express');
var router = express.Router();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var User = require('../models/user');
// Using require() in ES5
var FB = require('fb');



passport.use(new FacebookStrategy({
    clientID:359116497789278,
    clientSecret:'b752ea1868ab99affc1f8efcbb252f91',
    callbackURL: "http://localhost:3000/facebook/callback",
  },
  function(accessToken, refreshToken, profile, done) {
      done(null,user={accessToken:accessToken,id:profile.id});
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

router.get('/profile',function  (req, res, next) {
  if(!req.session.passport){
    res.redirect('/facebook');
    next();
    if(!req.session.passport.user){
      console.log('is session');
      res.redirect('/facebook');
    }
  }
  FB.setAccessToken(req.session.passport.user.accessToken);
  FB.api('me/', { fields: ['id', 'name','picture','about'] }, function (r) {
  if(!r || res.error) {
    console.log(!r ? 'error occurred' : res.error);
    return;
  }else{
    res.render('profile',{data:r});
  }
});
})

router.get('/auth', passport.authenticate('facebook',{scope:['email','user_friends','user_about_me','user_photos']}));

router.get('/callback',
	passport.authenticate('facebook', { successRedirect: '/facebook/profile',failureRedirect: '/login' })
);


module.exports = router;
