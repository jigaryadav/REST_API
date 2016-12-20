var express = require('express');
var router = express.Router();

var User = require('../models/user')

/* GET home page. */
router.post('/register', function(req, res, next) {
	var email = req.body.email;
	var password = req.body.password;
	var newUser = new User({
		email:email,
		password:password
	});
	
	User.createUser(newUser,function  (e,r) {
		console.log(r);
	})
});

router.get('/register', function(req, res, next) {
	res.render('register');
});

router.get('/login', function(req, res, next) {
	res.render('login');
});

module.exports = router;
