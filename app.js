require('dotenv').config();
const express = require('express');
const connectDB = require('./mongoDB/connections')
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes')
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');




const app = express();

// Using before my routes are set up
app.use(cors());

connectDB()

app.use(session({ secret: process.env.SESSION_SECRET , resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const User = require('./mongoDB/models');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
});


app.use(express.json());

// ... (my routes)
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
