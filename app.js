const express = require('express');
const connectDB = require('./mongoDB/connections')
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes')



const app = express();

connectDB()

app.use(express.json());


app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
