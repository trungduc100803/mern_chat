const postController = require('../controllers/postController')
const router = require('express').Router()


router.post('/create-post', postController.create_post)
router.get('/get-all-post-for-auth', postController.getAllPostForIDAuth)

module.exports = router