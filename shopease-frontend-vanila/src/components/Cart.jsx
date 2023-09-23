import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";



const ShoppingCart = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch the product data from your API
        axios.get("http://localhost:3000/user/:userId/cart")

            .then((response) => {
                setProducts(response.data);  // Update the products state
                console.log("Fetched products:", response.data + "worked!");
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []); // Empty dependency array means this useEffect runs once when component mounts

    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    );
}


export default ShoppingCart;