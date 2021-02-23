
/* 
NOT PART OF THE APLLICATION JUST HERE FOR MONGOOSE UNDERSTANDING PURPOSE


testing mongoose schema virtual logic with mongoose method approach.
mongoose Virtual is also part of middleware.
*/

import mongoose from 'mongoose';

const testSchema = mongoose.Schema({
    hashed_password: {
        type: String, 
        required: 'Password is required' // these are called mongoose validations
    },
    salt: String
})

testSchema.virtual('password').set(function(password){ //seting data accordingly using set approach
    this._password = password
    this.salt = 'secret'
    this.hashed_password = this.encryptPassword(password)
}).get(function(){ // now when requesting returng back the password
    return this._password
})

testSchema.methods = {
    encryptPassword: function(password){
        if (!password) return ''
        return (password + 'encrypted')
    }
}

const test = mongoose.model('test', testSchema)

const doc = new test();

doc.password = '99682246';
console.log(doc.hashed_password);
console.log(doc.salt);
console.log(doc.password);
console.log(doc._password);
