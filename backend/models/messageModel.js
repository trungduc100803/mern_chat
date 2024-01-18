const mongoose = require('mongoose')

const message = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'auth'
    },
    content: { type: String, require: true },
    userRecevied: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'auth'
    }
}, { timestamps: true })

let messageModel = mongoose.model('message', message)

module.exports = messageModel
