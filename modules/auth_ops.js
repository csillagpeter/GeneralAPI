const express = require('express');
const router = express.Router();
const SHAl = require('sha1');

var db = require('../utils/database')


 
//login
router.post('/login', (req, res)=>{
    let table = 'users';
    let email = req.body.email;
    let passwd = req.body.passwd;

    if(!email|| !passwd)
        {
            return res.status(400).json({error:'missing require fields'})
        }



})
//register
router.post('/register', (req, res)=>{
    let table = 'users';
    let data = req.body;

    let fields = Object.keys(data);
    let values = Object.values(data);

    let nameIdx = fields.indexOf('name')
    let emailIdx = fields.indexOf('email')
    let passwdIdx=fields.indexOf('password');
    let confirmIdx = fields.indexOf('confirm')

    if(nameIdx<0|| emailIdx<0||passwdIdx<0||confirmIdx<0)
        {
            return res.status(400).json({error:'missing require fields'})
        }
    if( values[passwdIdx]!=values[confirmIdx])
        {
            return res.status(400).json({error:'The password does`t match'})
        }
    db.query(`SELECT * FROM ${table} WHERE email=?`,[values[emailIdx ]],(err,results) =>
    {
        if(err)
            {
                return res.status(500).json({error: err.error})
            }
        if(results.length>0)
            {
                return res.status(400).json({error:'this email alredy '})
            }
        if(passwdIdx>0){
            values[passwdIdx]= SHAl(values[passwdIdx]);
        }

        fields.splice(confirmIdx, 1);
        values.splice(confirmIdx, 1)

        fields = fields.join(', ')
        values="'"+values.join("', '")+"'"

         db.query(`INSERT INTO ${table} (${fields}) VALUES(${values})`,(err,_ressults)=>
            {
                if(err)
            {
                return res.status(500).json({error: err.error})
            }
            return res.status(200).json({message:"sussecfuly registration"})

            })

    });


    if(passwdIdx > 0)
        {
            values[passwdIdx]=SHAl(values[passwdIdx]);
        }
})
//token verification
 
//isloggedin
 
 
module.exports = router; 


