const express = require('express');
const router = express.Router();
const ReservationController = require('../controller/reservedseats');

const ReservationSeats = () => {
  router.get('/book-seats/:busId', ReservationController.ReservationSeats);
  return router;
};

module.exports = {
  ReservationSeats,
};
