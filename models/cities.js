const mongoose = require('mongoose');
require('../config/mongodb')
const cities = mongoose.model('cities', {
    name: String,
    stateId: String,
    createdAt: Date,
    updatedAt: Date,
})

module.exports = cities;