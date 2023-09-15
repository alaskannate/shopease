const mongoose = require('mongoose');


const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 },
}, {
    timestamps: true,
});

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
    },
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    wishlist: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1 },
        }
    ],
    cart: [cartItemSchema]
});



const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: String,
    image: String,
});

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
        },
    ],
    status: { type: String, required: true, default: 'Pending' },
    totalPrice: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);

module.exports = { User, Product, Order };
