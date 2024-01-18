const messageModel = require('../models/messageModel')

const messageController = {
    getAllMessageForChat: async (req, res) => {
        try {
            if (!req.query.IDSender || !req.query.IDUserRecevied) return res.status(401).send({
                success: false,
                message: "Invalid fields"
            })

            const messages = await messageModel.find({ sender: req.query.IDSender, userRecevied: req.query.IDUserRecevied })

            return res.status(200).send({
                success: true,
                message: "success",
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