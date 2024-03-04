const mongoose = require('mongoose')


const post = mongoose.Schema({
    contentText: {type: String, default: ''},
    file: [
        {type: String, default: ''}
    ],
    emotion: {
        like: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'auth'
            }
        ],
        haha: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'auth'
            }
        ],
        love: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'auth'
            }
        ],
        sad: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'auth'
            }
        ]
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