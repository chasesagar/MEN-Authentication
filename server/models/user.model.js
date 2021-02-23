import mongoose from 'mongoose';
import crypto from 'crypto';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    hashed_password: {
        type: String,
        required: 'Password is required'
    },
    salt: String,

    updated: Date,

    created: {
        type: Date,
        default: Date.now
    }
})

// using mongoose Virtuals for logic implementation.
UserSchema.virtual('password').set(function(password){
    this._password = password // take user password
    this.salt = this.makeSalt() // creating a user specific salt, function execution below
    this.hashed_password = this.encryptPassword(password) // encrypting user entered password
}).get(function(){
    return this._password
})

// Validating user entered password
UserSchema.path('hashed_password').validate(function(v){
    if (this._password && this._password.length < 6) {
        this.invalidate('password', 'password must be at least 6 characters.')
    } 
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required')
    }
}, null)

// Required Functions 
UserSchema.methods = {
    // Authemtication function code
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },
    // Encryption password code
    encryptPassword: function(password) {
        if (!password) return ''
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (err) {
            return ''
        }
    },
    // Unique Salt creator
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }

}

var User = mongoose.model('User', UserSchema);

export default User;