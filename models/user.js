var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost:27017/REST')

var db = mongoose.connection;

var UserSchema = mongoose.Schema({
	email:{
		type:String
	},
	password:{
		type:String
	}
});

var User = module.exports = mongoose.model('User',UserSchema);

module.exports.createUser = function (newUser,callback) {
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	    	newUser.password = hash;
	    	newUser.save(callback);
	    });
	});

}
