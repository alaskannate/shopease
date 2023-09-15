const express = require('express');
const { authenticateToken } = require('../middleware.js');
const { User, Product } = require('../mongoDB/models.js');
const router = express.Router();




// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Get one User by ID 
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send(error);
        console.log
    }
});

// Authenticate a user (Login)
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username, password: req.body.password });
        if (user) {
            res.status(200).send(user);
            console.log("user login")
        } else {
            res.status(400).send('Invalid credentials');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// Unauthenticate a user (Logout)
router.post('/logout', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username, password: req.body.password });
        if (user) {
            res.status(200).send(user);
            console.log("user logout")
            // res.redirect("")
        } else {
            res.status(400).send('Invalid credentials');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get user cart 
router.get('/:userId/cart', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('cart');
        res.status(200).send(user.cart);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Post item to cart
router.post('/:userId/cart/add', async (req, res) => {
    try {
        //Find the user
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Find the product
        const product = await Product.findById(req.body.productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Check if the product is already in the cart
        const cartItemIndex = user.cart.findIndex(item => item.product.toString() === req.body.productId);
        if (cartItemIndex !== -1) {
            // Product is in the cart, increase the quantity
            user.cart[cartItemIndex].quantity += 1;
        } else {
            // Product is not in the cart, add it with quantity 1
            user.cart.push({ product: product._id, quantity: 1 });
        }

        // Save the updated user document
        await user.save();

        // Send the updated cart in the response
        res.status(200).send(user.cart);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Remove one item from cart
router.delete('/:userId/cart/:productId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        // Find the index of the product to be reduced
        const productIndex = user.cart.findIndex(item => item.product.toString() === req.params.productId);

        // If product was found in the cart
        if (productIndex > -1) {
            // If the quantity of the product is more than one, reduce it by one
            if (user.cart[productIndex].quantity > 1) {
                user.cart[productIndex].quantity -= 1;
            } else {
                // If the quantity is one, remove the product from the cart
                user.cart.splice(productIndex, 1);
            }

            await user.save();
            res.status(200).send(user.cart);
        } else {
            res.status(404).send('Product not found in cart');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get user wishlist
router.get('/:userId/wishlist', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const wishlist = user.wishlist; // Assuming that the wishlist field is available in your user schema
        res.status(200).send(wishlist);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Post item to wishlist 
router.post('/:userId/wishlist/add', async (req, res) => {
    try {
        // Step 1: Find the user
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Step 2: Find the product
        const product = await Product.findById(req.body.productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Step 3: Check if the product is already in the wishlist
        const wishlistItemIndex = user.wishlist.findIndex(item => item.product.toString() === req.body.productId);
        if (wishlistItemIndex !== -1) {
            // Product is in the cart , increase the quantity
            user.wishlist[wishlistItemIndex].quantity += 1;
        } else {
            // Product is not in the cart, add it with quantity 1
            user.wishlist.push({ product: product._id, quantity: 1 });
        }

        // Step 4: Save the updated user document
        await user.save();

        // Step 5: Send the updated cart in the response
        res.status(200).send(user.wishlist);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Remove one item from wishlist
router.delete('/:userId/wishlist/delete', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const productId = req.body.productId;  // Getting product ID from the request body

        // Find the index of the product to be removed
        const productIndex = user.wishlist.findIndex(item => item.product.toString() === productId);

        // If product was found in the wishlist
        if (productIndex > -1) {
            // If the quantity of the product is more than one, reduce it by one
            // else remove the product from the wishlist
            if (user.wishlist[productIndex].quantity > 1) {
                user.wishlist[productIndex].quantity -= 1;
            } else {
                user.wishlist.splice(productIndex, 1);
            }

            await user.save();
            res.status(200).send(user.wishlist);
        } else {
            res.status(404).send('Product not found in wishlist');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});




module.exports = router;
