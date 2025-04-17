const axios = require('axios');
const db = require('../db/db');

const SendOtpForEmailValidation = async (email, otp) => {
  try {
    await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: { name: 'Booking App', email: 'praneethvelaga1016@gmail.com' },
        to: [{ email }],
        subject: 'Your OTP Code',
        htmlContent: `<p>Your OTP is <b>${otp}</b>. It expires in 5 minutes.</p>`,
      },
      {
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (err) {
    throw new Error(`Failed to send OTP email: ${err.message}`);
  }
};

const ChangePassword = async (email, password) => {
    console.log(password)
  try {
    await db.query(`UPDATE users SET password = ? WHERE email = ?`, [password, email]);
    return true;
  } catch (err) {
    console.error('Error updating password:', err);
    return false;
  }
};

module.exports = {
  SendOtpForEmailValidation,
  ChangePassword,
};