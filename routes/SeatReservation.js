const express = require('express');
const router = express.Router();
const ReservationController = require('../controller/ReservationCOntroller')

const Reservation=()=>{
    router.post('/reservation',ReservationController.Reservation);
    return router;
}
module.exports ={
    Reservation,
}