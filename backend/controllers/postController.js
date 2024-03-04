const postModel = require('../models/postModel')


const postController = {
    create_post: async (req, res) => {
        try {
            const {IDAuth, data} = req.body

            if(!IDAuth || !data) return res.status(402).send({
                success: false,
                message: 'invalid fields'
            })

            const post = await postModel.create({
                contentText: data.contentText,
                file: data.file,
                author: IDAuth
            })

            if(!post) return res.status(402).send({
                success: false,
                message: 'no post'
            })

            return res.status(200).send({
                success: true,
                post
            })

        } catch (error) {
            return res.status(500).send({
                message: 'error',
                success: false,
                error
            })
        }
    },
    getAllPostForIDAuth: async (req, res) => {
        try {
            if(!req.query.IDAuth) return res.status(402).send({
                success: false,
                message: 'no auth'
            })

            const posts = await postModel.find({author: req.query.IDAuth})

             // sort message from comming to lates
             for (let i = 1; i < posts.length; i++) {
                let postcomming = posts[i]
                let j = i - 1
                while (j >= 0 && posts[j].createdAt < postcomming.createdAt) {
                    posts[j + 1] = posts[j]
                    j--
                }
                posts[j + 1] = postcomming
            }

            return res.status(200).send({
                success: true,
                posts
            })

        } catch (error) {
            return res.status(500).send({
                success: false,
                error,
                message: 'error'
            })
        }
    },
    likePost: async (req, res) => {
        try {
            const {IDAuthLiked, IDPost} = req.body

            if(!IDAuthLiked || !IDPost) return res.status(402).send({
                success: false,
                message: 'invalid fields'
            })

            const post = await postModel.findById(IDPost)

            if(!post) return res.status(405).send({
                success: false,
                message: 'not exit post'
            })

            post.emotion.like.push(IDAuthLiked)
            post.save()

            return res.status(200).send({
                success: true,
                post,
                message:"like success"
            })
        } catch (error) {
            return res.status(500).send({
                success: false,
                error,
                message: 'error'
            })
        }
    },
    cancelLikePost: async (req, res) => {
        try {
            const {IDAuthLiked, IDPost} = req.body
            if(!IDAuthLiked || !IDPost) return res.status(402).send({
                success: false,
                message: 'invalid fields'
            })

            const post = await postModel.findById(IDPost)

            if(!post) return res.status(405).send({
                success: false,
                message: 'not exit post'
            })

            const indexAuth = post.emotion.like.indexOf(IDAuthLiked)
            post.emotion.like.splice( indexAuth, 1)
            post.save()
            

            return res.status(200).send({
                success: true,
                message: 'cancel like success',
                post
            })

        } catch (error) {
            return res.status(500).send({
                success: false,
                message: 'error',
                error
            })
        }
    },
    commentPost: async (req, res) => {
        try {
            const {IDAuthCommented, IDAuthor, contentComment, IDPost} = req.body
            if(!IDAuthCommented || !IDAuthor, !contentComment || !IDPost) return res.status(402).send({
                success: false, 
                message: 'invalid fields'
            })

            const post = await postModel.findById(IDPost)

            if(!post) return res.status(405).send({
                success: false,
                message: 'not exist post'
            })

            

        } catch (error) {
            return res.status(500).send({
                success: false,
                error,
                message: 'error'
            })
        }
    }
}

module.exports = postController