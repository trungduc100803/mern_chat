const router = require('express').Router()
const authController = require('../controllers/authController')
const verifyToken = require('../middlewares/verifyToken')

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/get-all-auth', authController.get_all_auth)
router.post('/get-all-auth-own-friend', verifyToken, authController.get_all_auth_own_friend)

module.exports = router