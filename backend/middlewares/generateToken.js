const jwt = require('jsonwebtoken')

const generateToken = (auth) => {
    return jwt.sign(
        { auth },
        process.env.TOKEN,

        {
            expiresIn: '1d',
        }
    )
}

module.exports = generateToken