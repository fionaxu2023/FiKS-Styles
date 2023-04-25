const session = require('express-session');


const guestSession = session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // set to true if using HTTPS
});


module.exports = guestSession;