const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
                  name: {type: String, required: true}
                , email: {type: String, required: true}
                , phone: {type: String, required: true}
                , imageUrl: {type: String, required: true}
                , group: {type: Array, required: true}
    })

module.exports = mongoose.model('Contact', contactSchema)