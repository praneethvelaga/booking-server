const jwt = require('jsonwebtoken')
require('dotenv').config();


const JWT_SECRET = process.env.JWT_SECRET ;
const JWT_EXPIRATION = '1h';

function generateToken(user){
    const payload = {id : user.id, email : user.email}
    return jwt.sign(payload,JWT_SECRET,{expiresIn:JWT_EXPIRATION})
}

module.exports = {generateToken};