const messageModel = require('../models/messageModel')

const messageController = {
    getAllMessageForChat: async (req, res) => {
        try {
            if (!req.query.IDSender || !req.query.IDUserRecevied) return res.status(401).send({
                success: false,
                message: "Invalid fields"
            })

            const messagesSend = await messageModel.find({ sender: req.query.IDSender, userRecevied: req.query.IDUserRecevied })
            const messagesRecevied = await messageModel.find({ sender: req.query.IDUserRecevied, userRecevied: req.query.IDSender })

            const messages = [...messagesSend, ...messagesRecevied]

            // sort message from comming to lates
            for (let i = 1; i < messages.length; i++) {
                let messcomming = messages[i]
                let j = i - 1
                while (j >= 0 && messages[j].createdAt > messcomming.createdAt) {
                    messages[j + 1] = messages[j]
                    j--
                }
                messages[j + 1] = messcomming
            }

            return res.status(200).send({
                success: true,
                message: "successd",
                messages
            })
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: 'error'
            })
        }
    },
    createMessage: async (req, res) => {
        try {
            const { IDSender, IDUserRecevied, content } = req.body

            if (!IDSender || !IDUserRecevied || !content) return res.status(401).send({
                success: false,
                message: "Invalid fields"
            })

            const newMessage = await messageModel.create({
                sender: IDSender,
                content,
                userRecevied: IDUserRecevied
            })
            await newMessage.save()

            return res.status(200).send({
                success: true,
                message: 'created message successfully'
            })

        } catch (error) {
            return res.status(500).send({
                success: false,
                message: 'error'
            })
        }
    }
}

module.exports = messageController