const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const images = new Schema({
    faceImg: {
        type: String
    }
})

module.exports = mongoose.model('Image', images)