const postController = require('../controllers/postController')
const router = require('express').Router()


router.post('/create-post', postController.create_post)
router.get('/get-all-post-for-auth', postController.getAllPostForIDAuth)
router.post('/like-post', postController.likePost)
router.post('/cancel-like-post', postController.cancelLikePost)

module.exports = router