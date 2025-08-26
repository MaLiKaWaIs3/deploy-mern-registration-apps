// const { string, required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
name:{
    type: String,
    required: true,
},
email: {
    type: String,
    unique: true,
},
password:{
    type: String,
    required: true,
}
});//pass and create an object inside schema
const UserModel = mongoose.model('users',UserSchema);
module.exports = UserModel;
