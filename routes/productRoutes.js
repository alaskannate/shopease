const express = require('express');
const { authenticateToken } = require('../middleware.js');
const { Product } = require('../mongoDB/models.js');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send('Product not found');
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Create a single new product
router.post('/', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Add multiple products, checking for duplicate products. 
router.post('/bulk', async (req, res) => {
    try {
        const productsToAdd = [];
        const messages = [];

        for (const product of req.body) {
            const existingProduct = await Product.findOne({ name: product.name });
            if (existingProduct) {
                messages.push(`Product already exists with name ${product.name}. Would you like to patch that product instead? If so the API endpoint is router.put("/products/${existingProduct.id}")`);
            } else {
                productsToAdd.push(product);
            }
        }

        if (productsToAdd.length > 0) {
            await Product.insertMany(productsToAdd);
        }

        res.status(201).send({ message: 'Operation completed', details: messages });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update many products with their ID
// Each element in the request body array should be an object that contains the ID of the product to update. 
// like so, { "id": "613bb1d7fc13ae4038000654", "update": { "price": 19.99 } }
router.put('/bulk', async (req, res) => {
    try {
        const updates = req.body;
        const updatePromises = updates.map(async (update) => {
            return Product.findByIdAndUpdate(update.id, update.update, { new: true });
        });
        
        const updatedProducts = await Promise.all(updatePromises);
        res.status(200).send(updatedProducts);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a product by ID
// like so, http://localhost:3000/products/650377d185ee0f1e8f395535 - (in req.body) {"productName": "updatedName"}
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) return res.status(404).send('Product not found');
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a product by ID
// like so, http://localhost:3000/products/650377d185ee0f1e8f395535 - product with the prior id will be deleted.
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).send('Product not found');
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;

