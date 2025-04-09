// passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { validateLogin } = require('../services/loginServices');

passport.use(new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
        try {
            const user = await validateLogin(email, password);
            if (!user) {
                return done(null, false, { message: 'User not registered' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);  // You can store any user info here
});

passport.deserializeUser((id, done) => {
    // Query the user from the database based on ID (if needed)
    // For simplicity, we assume the user is already validated
    done(null, { id });
});

module.exports = passport;





