const express = require('express');
const router = express.Router();
const BuseslistController = require('../controller/BusesListController')

const BusesList =()=>{
    router.post('/list',BuseslistController.handleBusesListRequest);
    return router;
}
const BusById=()=>{
    router.get('/:busId',BuseslistController.handleBusByIdRequest);
    return router;
}
module.exports ={
    BusesList,
    BusById,
}