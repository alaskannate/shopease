const router = require('express').Router();
const passport = require('passport');
const { User } = require ('../mongoDB/models');


function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).send('Unauthorized');
  }

// Register user
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  await user.save();
  res.status(200).send('User registered');
});

// Login user
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).send('Logged in');
});

// Logout user
router.get('/logout', isAuthenticated, (req, res) => {
    req.logout(() => { // Adding callback function
      if (req.session) {
        req.session.destroy((err) => {  // destroy session data
          if (err) {
            return res.status(500).send('Could not log out.');
          } else {
            return res.status(200).send('Logged out.');
          }
        });
      } else {
        return res.status(200).send('Logged out.');
      }
    });
  });
  
  
  

module.exports = router;
