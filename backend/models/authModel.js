const mongoose = require('mongoose')

const auth = new mongoose.Schema({
    email: { type: String, require: true },
    password: { type: String, require: true },
    username: { type: String, require: true },
    avatar: { type: String, default: '' },
    cover: { type: String, default: '' },
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
    ],
    addFriend: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'auth',
        }
    ],
    FriendsHaveSentFriendRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'auth',
        }
    ],
    profile: {
        address: { type: String, default: '' },
        career: { type: String, default: '' },
        hobby: { type: String, default: '' },
        desc: { type: String, default: '' },
        school: { type: String, default: '' }
    }
}, { timestamps: true })

let authModel = mongoose.model('auth', auth)

module.exports = authModel 