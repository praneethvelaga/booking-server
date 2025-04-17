const { SendOtpForEmailValidation, ChangePassword } = require('../services/otpServices');
const encritUtil = require('../util/encryptUtil');

// In-memory OTP store (use Redis or a database in production)
const otpStore = new Map();

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Store OTP with expiration (5 minutes)
    otpStore.set(email, { otp, expires: Date.now() + 5 * 60 * 1000 });

    // Send OTP via email
    await SendOtpForEmailValidation(email, otp);

    res.json({ message: 'OTP sent to your email' });
  } catch (err) {
    console.error('Error sending OTP:', err);
    res.status(500).json({ message: 'Failed to send OTP', error: err.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const storedOtp = otpStore.get(email);
    if (!storedOtp) {
      return res.status(400).json({ success: false, message: 'OTP not found or expired' });
    }

    if (storedOtp.expires < Date.now()) {
      otpStore.delete(email);
      return res.status(400).json({ success: false, message: 'OTP expired' });
    }

    if (storedOtp.otp !== parseInt(otp)) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    // OTP is valid, clear it from store
    otpStore.delete(email);
    res.json({ success: true, message: 'OTP verified' });
  } catch (err) {
    console.error('Error verifying OTP:', err);
    res.status(500).json({ success: false, message: 'Error verifying OTP', error: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    console.log(password)
    // Hash password
    const hashedPassword = await encritUtil.hashPassword(password);

    // Update password in the database
    const success = await ChangePassword(email, hashedPassword);
    if (!success) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Error resetting password:', err);
    res.status(500).json({ message: 'Failed to reset password', error: err.message });
  }
};

module.exports = {
  sendOtp,
  verifyOtp,
  resetPassword,
};