const mongoose = require('mongoose');

const documentsSchema = mongoose.Schema({
     name: {type: String, required: true},
     description: {type: String, required: true},
     url: {type: String, required: true},
     children:{type: Array, required: true}
    })

module.exports = mongoose.model('Documents', documentsSchema)