const mongoose = require('mongoose');
require('../config/mongodb')
const user = mongoose.model('user', {
    nickName: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true,
        select: false
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

module.exports = user;