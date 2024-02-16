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

            const allAuthNotMe = allAuth.filter(auth => auth.email !== req.query.email)

            return res.status(200).send({
                success: true,
                allAuth: allAuthNotMe
            })
        } catch (error) {
            return res.status(500).send({
                message: 'error',
                error,
                success: false
            })
        }
    },
    get_all_auth_not_own_friend: async (req, res) => {
        try {
            const { IDAuth } = req.query
            if (!IDAuth) return res.status(401).send({
                message: 'invalid fields',
                success: false
            })


            const me = await authModel.findById(IDAuth)
            const allAuth = await authModel.find()
            const allAuthNotMe = allAuth.filter(auth => auth._id != IDAuth)


            const notMeAndOwnFriendsAuth = allAuthNotMe.filter(auth => !me.frienned.includes(auth._id))

            return res.status(200).send({
                success: true,
                notMeAndOwnFriendsAuth
            })

        } catch (error) {
            return res.status(500).send({
                message: 'error',
                error,
                success: false
            })
        }
    },
    editAvatar: async (req, res) => {
        try {
            const { IDAuth, fileAvatar } = req.body
            if (!IDAuth || !fileAvatar) return res.status(401).send({
                success: false,
                message: 'invalid fields'
            })

            const auth = await authModel.findByIdAndUpdate(IDAuth, { avatar: fileAvatar })
            if (auth) return res.status(200).send({
                success: true,
                message: 'update avatar success',
                auth
            })
        } catch (error) {
            return res.status(500).send({
                success: false,
                error
            })
        }
    },
    editCover: async (req, res) => {
        try {
            const { IDAuth, cover } = req.body
            if (!IDAuth || !cover) return res.status(401).send({
                success: false,
                message: 'invalid fields'
            })

            const auth = await authModel.findByIdAndUpdate(IDAuth, { cover })
            if (auth) return res.status(200).send({
                success: true,
                message: 'update cover success',
                auth
            })
        } catch (error) {
            return res.status(500).send({
                success: false,
                error
            })
        }
    },
    editDesc: async (req, res) => {
        try {
            const { IDAuth, desc } = req.body

            if (!IDAuth || !desc) return res.status(401).send({
                success: false,
                message: 'invalid fields'
            })

            const auth = await authModel.findById(IDAuth)
            if (!auth) return res.status(402).send({
                success: false,
                message: 'empty auth'
            })

            const profile = {
                address: auth.profile.address,
                career: auth.profile.career,
                desc: desc,
                school: auth.profile.school,
                hobby: auth.profile.hobby
            }
            const authUpdated = await authModel.findByIdAndUpdate(IDAuth, { profile })
            return res.status(200).send({
                success: true,
                auth: authUpdated,
                message: 'successfully'
            })
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: 'error',
                error
            })
        }
    },
    editAddress: async (req, res) => {
        try {
            const { IDAuth, address } = req.body
            if (!IDAuth || !address) return res.status(401).send({
                success: false,
                message: 'invalid fields'
            })

            const auth = await authModel.findById(IDAuth)
            if (!auth) return res.status(402).send({
                success: false,
                message: 'empty auth'
            })

            const profile = {
                address: address,
                career: auth.profile.career,
                desc: auth.profile.desc,
                school: auth.profile.school,
                hobby: auth.profile.hobby
            }
            const authUpdated = await authModel.findByIdAndUpdate(IDAuth, { profile })
            return res.status(200).send({
                success: true,
                auth: authUpdated,
                message: 'successfully'
            })
        } catch (error) {
            return res.status(500).send({
                success: false,
                error
            })
        }
    },
    editCareer: async (req, res) => {
        try {
            const { IDAuth, career } = req.body
            if (!IDAuth || !career) return res.status(401).send({
                success: false,
                message: 'invalid fields'
            })

            const auth = await authModel.findById(IDAuth)
            if (!auth) return res.status(402).send({
                success: false,
                message: 'empty auth'
            })

            const profile = {
                address: auth.profile.address,
                career: career,
                desc: auth.profile.desc,
                school: auth.profile.school,
                hobby: auth.profile.hobby
            }
            const authUpdated = await authModel.findByIdAndUpdate(IDAuth, { profile })
            return res.status(200).send({
                success: true,
                auth: authUpdated,
                message: 'successfully'
            })
        } catch (error) {
            return res.status(500).send({
                success: false,
                error
            })
        }
    },
    editSchool: async (req, res) => {
        try {
            const { IDAuth, school } = req.body
            if (!IDAuth || !school) return res.status(401).send({
                success: false,
                message: 'invalid fields'
            })

            const auth = await authModel.findById(IDAuth)
            if (!auth) return res.status(402).send({
                success: false,
                message: 'empty auth'
            })

            const profile = {
                address: auth.profile.address,
                career: auth.profile.school,
                desc: auth.profile.desc,
                school: school,
                hobby: auth.profile.hobby
            }
            const authUpdated = await authModel.findByIdAndUpdate(IDAuth, { profile })
            return res.status(200).send({
                success: true,
                auth: authUpdated,
                message: 'successfully'
            })
        } catch (error) {
            return res.status(500).send({
                success: false,
                error
            })
        }
    },
    editHobby: async (req, res) => {
        try {
            const { IDAuth, hobby } = req.body
            if (!IDAuth || !hobby) return res.status(401).send({
                success: false,
                message: 'invalid fields'
            })

            const auth = await authModel.findById(IDAuth)
            if (!auth) return res.status(402).send({
                success: false,
                message: 'empty auth'
            })

            const profile = {
                address: auth.profile.address,
                career: auth.profile.career,
                desc: auth.profile.desc,
                school: auth.profile.school,
                hobby: hobby
            }
            const authUpdated = await authModel.findByIdAndUpdate(IDAuth, { profile })
            return res.status(200).send({
                success: true,
                auth: authUpdated,
                message: 'successfully'
            })
        } catch (error) {
            return res.status(500).send({
                success: false,
                error
            })
        }
    },
    getAuthByID: async (req, res) => {
        try {
            const { IDAuth } = req.body
            if (!IDAuth) return res.status(401).send({
                success: false,
                message: 'invalid fields'
            })

            const auth = await authModel.findById(IDAuth)

            if (!auth) return res.status(401).send({
                success: false,
                message: 'no user'
            })

            return res.status(200).send({
                success: true,
                message: 'success',
                auth
            })
        } catch (error) {
            return res.status(500).send({
                success: false,
                error
            })
        }
    },
    addfriend: async (req, res) => {
        try {
            const { IDAuthSendRequest, IDAuthReceviedRequest } = req.body

            if (!IDAuthSendRequest || !IDAuthReceviedRequest) return res.status(401).send({
                success: false,
                message: 'invalid fields'
            })

            const authRecevied = await authModel.findById(IDAuthReceviedRequest)
            const authSend = await authModel.findById(IDAuthSendRequest)
            if (!authRecevied) return res.status(401).send({
                success: false,
                message: 'no find auth'
            })


            if (!authRecevied.addFriend) {
                await authModel.findByIdAndUpdate(IDAuthReceviedRequest, { addFriend: [IDAuthSendRequest] })
                if (!authSend.FriendsHaveSentFriendRequests) {
                    await authModel.findByIdAndUpdate(IDAuthSendRequest, { FriendsHaveSentFriendRequests: [IDAuthReceviedRequest] })
                } else {
                    await authModel.findByIdAndUpdate(IDAuthSendRequest, { FriendsHaveSentFriendRequests: [...authSend.FriendsHaveSentFriendRequests, IDAuthReceviedRequest] })
                }
                const auth = await authModel.findById(IDAuthReceviedRequest)
                return res.status(200).send({
                    success: true,
                    message: 'succes add friend',
                    auth
                })
            } else {
                await authModel.findByIdAndUpdate(IDAuthReceviedRequest, { addFriend: [...authRecevied.addFriend, IDAuthSendRequest] })
                if (!authSend.FriendsHaveSentFriendRequests) {
                    await authModel.findByIdAndUpdate(IDAuthSendRequest, { FriendsHaveSentFriendRequests: [IDAuthReceviedRequest] })
                } else {
                    await authModel.findByIdAndUpdate(IDAuthSendRequest, { FriendsHaveSentFriendRequests: [...authSend.FriendsHaveSentFriendRequests, IDAuthReceviedRequest] })
                }
                const auth = await authModel.findById(IDAuthReceviedRequest)
                return res.status(200).send({
                    success: true,
                    message: 'succes add friend',
                    auth
                })
            }
        } catch (error) {
            return res.status(500).send({
                success: false,
                error,
                message: "error"
            })
        }
    },
    cancelFriend: async (req, res) => {
        try {
            const { IDAuthSendRequest, IDAuthReceviedRequest } = req.body

            if (!IDAuthSendRequest || !IDAuthReceviedRequest) return res.status(401).send({
                success: false,
                message: 'invalid fields'
            })

            const authRecevied = await authModel.findById(IDAuthReceviedRequest)
            const authSend = await authModel.findById(IDAuthSendRequest)
            if (!authRecevied || !authSend) return res.status(401).send({
                success: false,
                message: 'no find auth'
            })

            // Tìm kiếm phần tử trong mảng
            let index = authRecevied.addFriend.indexOf(IDAuthSendRequest);
            let indexSend = authSend.FriendsHaveSentFriendRequests.indexOf(IDAuthReceviedRequest);

            // Nếu phần tử tồn tại trong mảng, xóa nó
            if (index !== -1) {
                authRecevied.addFriend.splice(index, 1);
                await authRecevied.save()
            } else {
                console.log(`Không tìm thấy phần tử trong mảng`);
            }

            if (indexSend !== -1) {
                authSend.FriendsHaveSentFriendRequests.splice(indexSend, 1);
                await authSend.save()
            } else {
                console.log(`Không tìm thấy phần tử trong mảng send`);
            }

            return res.status(200).send({
                success: true,
                message: 'succes add friend',
                auth: authSend
            })
        } catch (error) {
            return res.status(500).send({
                success: false,
                error,
                message: "error"
            })
        }
    },
    getAllRequestAddFriend: async (req, res) => {
        try {
            const { IDAuth } = req.query

            if (!IDAuth) return res.status(401).send({
                success: false,
                message: 'invalid fields'
            })

            const auth = await authModel.findById(IDAuth)

            if (!auth) return res.status(402).send({
                success: false,
                message: 'not auth'
            })

            let allRequestAddFriend = []
            await Promise.all(auth.addFriend.map(async friendID => {
                const friend = await authModel.findById(friendID);
                allRequestAddFriend.push(friend);
            }));

            return res.status(200).send({
                success: true,
                auth: allRequestAddFriend
            })
        } catch (error) {
            return res.status(500).send({
                success: false,
                error
            })
        }
    },
    acceptRequestAddFriend: async (req, res) => {
        try {
            const { IDAuthAccept, IDAuthRequest } = req.body
            if (!IDAuthAccept || !IDAuthRequest) return res.status(402).send({
                success: false,
                message: 'invalid fields'
            })

            const authAccept = await authModel.findById(IDAuthAccept)
            const authSend = await authModel.findById(IDAuthRequest)
            const requestAddFriendOfAuthAccept = authAccept.addFriend

            let index = requestAddFriendOfAuthAccept.indexOf(IDAuthRequest);

            if (index !== -1) {
                authAccept.addFriend.splice(index, 1);
                authAccept.frienned.push(IDAuthRequest)
                authSend.frienned.push(IDAuthAccept)
                await authAccept.save()
                await authSend.save()
            } else {
                console.log(`Không tìm thấy phần tử trong mảng`);
            }

            return res.status(200).send({
                success: true,
                auth: authAccept
            })

        } catch (error) {
            return res.status(500).send({
                success: false,
                error
            })
        }
    }
}

module.exports = authController