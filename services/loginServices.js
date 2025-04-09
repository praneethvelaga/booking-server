const db = require('../db/db.js');
const encritUtil = require('../util/encryptUtil.js');

async function validateLogin(email, password) {
    try{
        const result = await db.query('SELECT * FROM users WHERE email = ?',[email]);
        //console.log(email)
        if (result.length === 0) return null;

        const user = result[0];
        const isPasswordValid = await encritUtil.comparePassword(password, user.password);
    
        if(isPasswordValid){
            return user;
    
        }else{
            return null;
        }
    }catch(err){
        console.log(`Error during login validation`, err);
        throw err;
    }
}
async function registerValidation(fullname, dateofbirth, gender, email, phonenumber, hashPassword){
    try{
        await db.query(`INSERT INTO users (fullname, dateofbirth, gender, email, phonenumber, password)VALUES (?, ?, ?, ?, ?, ?)`,[fullname, dateofbirth, gender, email, phonenumber, hashPassword]);
        return true
    }catch(err){

        return false
    }
}
 module.exports={
    validateLogin,
    registerValidation
 }