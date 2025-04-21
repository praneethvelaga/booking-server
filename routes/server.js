'use strict';
const device = require('express-device')
const authRoute = require('./login.js')
const homeRoute = require('./home.js')
const Constituencies = require('./Constituencies.js')
const Buseslist= require('./BusesList.js')
const EmpValidation= require('./EmpValidation.js')
const BuseSeatReservation = require('./SeatReservation.js');
const reservedSetas = require('./reservedSeats.js')
const otpRouter = require('./otpRoute.js')

const assingRoutes=(app)=>{
app.use(device.capture())
app.use('/api/auth',authRoute.LoginRoutes());
app.use('/api/regist',authRoute.registrRoute());
app.use('/api/home',homeRoute)
app.use('/api/Constituencies',Constituencies.Constituencies());
app.use('/api/buseslist',Buseslist.BusesList());
app.use('/api/buses',Buseslist.BusById());
app.use('/api/Validation',EmpValidation.ValidationByEmpId());
app.use('/api/bookingSeats',BuseSeatReservation.Reservation());
app.use('/api/reservations',reservedSetas.ReservationSeats());
app.use('/api/otp',otpRouter.sendOtp());
app.use('/api/otp',otpRouter.verifyOtp());
app.use('/api/otp',otpRouter.resetPassword());

}

module.exports = assingRoutes;