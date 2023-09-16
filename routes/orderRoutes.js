const express = require('express');
const { authenticateToken } = require('../middleware.js');
const { Order, Product, User } = require('../mongoDB/models.js');
const router = express.Router();




//Creates a new order instance from the user cart data. 
router.post('/:userId/placeOrder', async (req, res) => {
    try {
        // Step 1: Find the user based on userId
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Step 2: Find the products in the user's cart
        const productsInCart = await Product.find({ '_id': { $in: user.cart.map(item => item.product) } });

        if (productsInCart.length === 0) {
            return res.status(400).send('No products in the cart');
        }

        // Step 3: Calculate the total price
        let totalPrice = 0;
        productsInCart.forEach(product => {
            const cartItem = user.cart.find(item => item.product.toString() === product._id.toString());
            if (cartItem) {
                totalPrice += product.price * cartItem.quantity;
            }
        });

        // Step 4: Create a new Order instance
        const newOrder = new Order({
            user: user._id,
            products: user.cart.map(cartItem => ({
                product: cartItem.product,
                quantity: cartItem.quantity,
            })),
            status: 'Pending',
            totalPrice: totalPrice,
            date: new Date(),
            // Add user info and other fields as necessary
        });

        // Step 5: Save the new order
        await newOrder.save();

        // Step 6: Update the user's order history and clear the cart
        user.orderHistory.push(newOrder._id);
        user.cart = [];
        await user.save();

        // Step 7: Respond with the new order
        res.status(201).send(newOrder);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Creates a new wishlist from the user cart data. 
router.post('/:userId/cartToWishlist', async (req, res) => {
    try {
        // Find the user by the userId
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Add all cart items to the wishlist
        user.wishlist = [...user.cart];

        // Clear the user's cart
        user.cart = [];
        await user.save();

        res.status(200).send('Cart items moved to wishlist successfully');
    } catch (error) {
        res.status(500).send(error);
    }
});


// Get all orders of a user
router.get('/:userId/orders', async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId });
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error);
    }
});



//Get all orders of all users 
router.get('/', async (req, res) => {
    try {
        const allOrders = await Order.find();
        res.status(200).send(allOrders);
    } catch (error) {
        res.status(500).send(error)
    }
})

//Delete all orders 
router.delete('/:userId/deleteOrders', async (req, res) => {
    try {
        // Find the user by the userId
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Delete all orders of the user
        await Order.deleteMany({ user: user._id });

        // Clear the user's order history
        user.orderHistory = [];
        await user.save();

        res.status(200).send('All orders deleted successfully');
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;