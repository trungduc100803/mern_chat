const mongoose = require('mongoose')

const connect = async () => {
    mongoose.connect('mongodb://127.0.0.1:27017/mern_chat')
        .then(() => console.log('DB connected'))
        .catch(err => console.log('err:', err))
}

module.exports = { connect }