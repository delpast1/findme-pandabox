var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var userSchema = mongoose.Schema({
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String,
        point: Number
    }
}); 

module.exports = mongoose.model('User', userSchema);