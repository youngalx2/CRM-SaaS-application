const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const bcrypt    = require('bcryptjs');

let userSchema = new Schema({

    firstname : {
        type: String,
        trim : true
    },
    lastname : {
        type: String,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    roles : {
        type : Array
    },
    active : {
        type : Boolean,
        default : false
    },
    token : {
        type : String
    },
    _account : {
        type: Schema.ObjectId,
        ref : 'Account',
        required : true
    },
    _agency : {
        type : Schema.ObjectId,
        ref : 'Agency'
    },
    type : {
        type : String
    }
});

userSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        delete ret.token;
        delete ret.password;
        return ret;
    }
});

userSchema.pre('save', function(next) {

    if(this.isModified('password')) {
        bcrypt.hash(this.password, 10, (err, hash) => {
            this.password = hash;
            next();
        });
    }
    else {
        next();
    }
});

module.exports = mongoose.model('User', userSchema);