const mongoose = require('mongoose');
require('../config/mongodb')
const states = mongoose.model('states', {
    name: String,
    initials: String,
    createdAt: Date,
    updatedAt: Date
})

module.exports = states;