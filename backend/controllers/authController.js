const authModel = require('../models/authModel')
const generateToken = require('../middlewares/generateToken')
const bcrypt = require('bcrypt')

const authController = {
    register: async (req, res) => {
        const saltRound = 10
        try {
            const { email, username, password } = req.body

            if (!email || !username || !password) return res.status(401).send({
                success: false,
                message: "invalid fields"
            })

            const salt = await bcrypt.genSalt(saltRound)
            const hash = await bcrypt.hash(password.trim(), salt)

            const auth = await authModel.findOne({ email })

            if (auth) return res.status(402).send({
                success: false,
                message: "auth exits"
            })

            const newAuth = await new authModel({
                email,
                password: hash,
                username
            })
            const authSaved = await newAuth.save()

            return res.status(200).send({
                success: true,
                message: "register success",
                auth: authSaved
            })


        } catch (error) {
            return res.status(500).send({
                success: false,
                error,
                message: "error"
            })
        }

    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body

            if (!email || !password) return res.status(401).send({
                success: false,
                message: "invalid fields"
            })

            const auth = await authModel.findOne({ email })

            if (!auth) return res.status(402).send({
                success: false,
                message: "auth no exists"
            })

            const comparePassword = await bcrypt.compare(
                password,
                auth.password
            )

            if (!comparePassword) return res.status(403).send({
                success: false,
                message: "incorrect password"
            })

            if (auth && comparePassword) {
                const token = generateToken(auth)
                const { password, ...dataUser } = auth._doc

                return res.status(200).send({
                    success: true,
                    message: "login success",
                    auth: dataUser,
                    token
                })
            }


        } catch (error) {
            return res.status(500).send({
                success: false,
                error,
                message: 'error'
            })
        }
    },
    get_all_auth_own_friend: async (req, res) => {
        try {
            const { idAuth } = req.body
            const auth = await authModel.findById(idAuth)

            const IDownFriend = auth.frienned
            const ownFriend = await Promise.all(IDownFriend.map(async (friend) => {
                const friendAuth = await authModel.findById(friend._id)
                return friendAuth
            }))

            return res.status(200).send({
                success: true,
                ownFriend
            })
        } catch (error) {
            return res.status(500).send({
                message: 'error',
                error,
                success: false
            })
        }
    },
    get_all_auth: async (req, res) => {
        try {
            const allAuth = await authModel.find()

            // const allAuthNotMe = allAuth.filter(auth => auth.email != req.params.email)

            return res.status(200).send({
                success: true,
                allAuth
            })
        } catch (error) {
            return res.status(500).send({
                message: 'error',
                error,
                success: false
            })
        }
    }
}

module.exports = authController