const router = require('express').Router()
const messageController = require('../controllers/messageController')


router.get('/get-all-message-for-a-chat', messageController.getAllMessageForChat)
router.post('/create-mesage', messageController.createMessage)

module.exports = router