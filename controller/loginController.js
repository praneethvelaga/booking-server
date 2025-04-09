'use strict';

const tokenService = require('../services/tokenservices.js');
const { validateLogin,registerValidation } = require('../services/loginServices.js');
const encritUtil = require('../util/encryptUtil.js');

const login = async (req, res) => {
    const { email, password } = req.body;
    // console.log(email);
    // console.log(password);
    if (!email || !password) {
        return res.status(400).json({ message: `email and password required` });
    }
    try {
        const user = await validateLogin(email, password);
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = tokenService.generateToken(user)
        console.log(token)
        return res.json({ message: 'Login successful', token: `${token}`, user: user })
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'server error' })
    }
}



const regsiter = async (req, res) => {
    const { fullname, dateofbirth, gender, email, phonenumber, password } = req.body;
    if ([fullname, dateofbirth, gender, email, phonenumber, password].some(field => field === undefined)) {
        return res.status(400).json({ message: "All fields must be defined. Undefined values detected." });
    }
    if (!fullname || !dateofbirth || !gender || !email || !phonenumber || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try{
        const hashPassword = await encritUtil.hashPassword(password);
        const result =await registerValidation(fullname, dateofbirth, gender, email, phonenumber, hashPassword);
        if (result) {
            return res.status(201).json({ message: "User registered successfully" });
        } else {
            return res.status(400).json({ message: "User registration failed" });
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({message:'Failed to registerrr'});
    }
}
module.exports = {
    login,
    regsiter
}