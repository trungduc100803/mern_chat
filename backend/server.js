const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 4000
const app = express()
const DB = require('./config/mongoseDB')

const { createServer } = require('http')
const { Server } = require('socket.io')

const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

global.onlineUser = new Map()

io.on('connection', (socket) => {
    console.log("user connect")

    socket.on('user-online', user => {
        console.log(user)
        onlineUser.set(user, socket.id)
        console.log(onlineUser)
    })

    socket.on('send-message', (data) => {
        const idRecevieUser = onlineUser.get(data.to)
        if (idRecevieUser) {
            socket.to(idRecevieUser).emit('recevie-message', {
                from: data.from,
                to: data.to
            })
        }
    })


    socket.on('disconnect', () => {
        console.log('user disconnect')
    })

})


app.use(cors())
app.use(morgan('combined'))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded())
app.use(cookieParser())


DB.connect()

const authRouter = require('./routers/auth')
const messageRouter = require('./routers/message')

app.use('/api/auth', authRouter)
app.use('/api/message', messageRouter)


httpServer.listen(PORT, () => {
    console.log("server in running on" + PORT)
})
