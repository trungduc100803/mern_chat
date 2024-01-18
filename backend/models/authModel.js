const mongoose = require('mongoose')

const auth = new mongoose.Schema({
    email: { type: String, require: true },
    password: { type: String, require: true },
    username: { type: String, require: true },
    avatar: { type: String, default: '' },
    chats: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'auth'
        }
    ],
    frienned: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'auth'
        }
    ]
}, { timestamps: true })

let authModel = mongoose.model('auth', auth)

module.exports = authModel 