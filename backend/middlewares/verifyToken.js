const JWT = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const { token } = req.body

    if (token) {
        try {
            const accessToken = token.split(' ')[1]
            const auth = JWT.verify(accessToken, process.env.TOKEN)

            if (auth) next()
        } catch (error) {
            return res.status(403).send({
                success: false,
                message: "forbidden"
            })
        }
    } else {
        return res.status(401).send({
            message: 'ban chua dang nhap',
            success: false
        })
    }
}

module.exports = verifyToken