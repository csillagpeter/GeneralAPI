var jwt = require('jsonwebtoken')

console.log ( generateToken({user:'tesztuser'}));
const { exceptions } = require('winston')
const logger = require('./logger')
var db = require('../utils/database')   

function generateToken(payload)
{
    
    const signOption=
    {
        expiresIn: process.env.JWT_EXPIRES_IN
    }
    return jwt.sign(payload,process.env.JWT_SECRET,signOption)
}
function verifyToken(token)
{
     return jwt.verify(token,process.env.JWT_SECRET);
}

function  tokencheck(req,res,next)
{
    const authHeader = req.headers['authorization'];// bearer *token*
    const token = authHeader && authHeader.split(' ')[1];
    if(!token)
        {
            return res.status(401).json({error:'token not found'})
        }
    try{
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    }catch(error)
        {
            return res.status(403).json({error:'invalid token or expired'})
        }
}

module.exports = 
{ 
    generateToken,
    verifyToken,
    tokencheck
}