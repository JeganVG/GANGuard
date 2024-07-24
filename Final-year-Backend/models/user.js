const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:"visitor"
    }
})

module.exports = mongoose.model('users', user)