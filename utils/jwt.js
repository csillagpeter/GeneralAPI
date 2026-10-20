var jwt = require('jsonwebtoken')
const { exceptions } = require('winston')
const logger = require('./logger')
var db = require('../utils/database')   

function generateToken(payload)
{

    const signOption=
    {
        expiresIn: process.env.JWT_EXPIRES_IN
    }
    jwt.sign(payload,process.env.JWT_SECRET,signOption)
}
function verifyToken(token)
{
     return jwt.verify(token,process.env.JWT_SECRET);
}
module.exports = 
{ 
    generateToken,
    verifyToken
}