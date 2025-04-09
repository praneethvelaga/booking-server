'use strict';
 const bcrypt = require('bcryptjs');

 //to hash code convertion

 async function hashPassword(password){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
 }

 //comparing paswword

 async function comparePassword(inputPassword, storedPassword) {
    const isMatch =  await bcrypt.compare(inputPassword, storedPassword);
    return isMatch;
 }

 module.exports = {hashPassword, comparePassword}