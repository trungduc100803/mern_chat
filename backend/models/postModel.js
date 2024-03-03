const mongoose = require('mongoose')


const post = mongoose.Schema({
    contentText: {type: String, default: ''},
    file: [
        {type: String, default: ''}
    ],
    emotion: {
        like: {type: Number, default: 0},
        haha: {type: Number, default: 0},
        love: {type: Number, default: 0},
        sad: {type: Number, default: 0}
    },
    comment: [
        {
            contentComment: {type: String, default: ''},
            from: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'auth'
            },
            to: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'auth'
            }
        }
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'auth'
    },
    numShare: {type: Number, default: 0}

},{timestamps: true})

let postModel = mongoose.model('post', post)

module.exports = postModel