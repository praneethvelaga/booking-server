const express = require('express')
const router = express.Router();
const ConstituenciesController = require('../controller/ConstituenciesController')

const Constituencies =()=>{
    router.get('/list',ConstituenciesController.handleConstituenciesRequest);
    
    return router;
}
module.exports={Constituencies}