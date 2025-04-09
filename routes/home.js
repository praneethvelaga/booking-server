const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/homeProfile',authenticateToken, (req,res)=>{
    res.json({ message: `Welcome to Home Page, ${req.user.email}!` });
})
module.exports = router;