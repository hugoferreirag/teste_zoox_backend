const mongoose = require('mongoose');
require('../config/mongodb')
const cities = mongoose.model('cities', {
    name: {
        type:String,
        required: true
    },
    stateId: {
        type:String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type:Date,
        required: true
    },
})

module.exports = cities;