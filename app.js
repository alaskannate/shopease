require('dotenv').config();
const express = require ('express')
const connectDB = require('./mongoDB/connections');
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

const app = express();

// Using cors before my routes are set up
// Enabling CORS for all routes
app.use(cors({
    origin: 'http://localhost:3001',  // replace with your frontend server's URL
    credentials: true,
  }));
// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();


// Initialize session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());


// My routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);



const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./mongoDB/models');
const bcrypt = require('bcrypt');

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Wrong password' });
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

//

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
