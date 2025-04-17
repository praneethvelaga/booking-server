const express = require('express');
const router = express.Router();
const otpController = require('../controller/otpController');

const sendOtp = () => {
  router.post('/send-otp', otpController.sendOtp);
  console.log('hi')
  return router;
};
const verifyOtp = () => {
    router.post('/verify-otp', otpController.verifyOtp);
    return router;
};
const resetPassword = () => {
    router.patch('/reset-password', otpController.resetPassword);
    return router;
  }; 

module.exports = {
    sendOtp,
    verifyOtp,
    resetPassword,
};