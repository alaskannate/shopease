import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    // Fetch the product data from your API
    axios.get("http://localhost:3000/products")
      
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
};

export default ProductList;





// import React from 'react';
// import ProductCard from './ProductCard';
// import "../styles.css"
// import axios from "axios";








// // const ProductList = ({ userId, products }) => {

// //     const addToCart = (productId) => {
// // console.log(productId)

// //         axios.post(`/api/${userId}/cart/add`, { productId: productId })
// //           .then(response => {
// //             console.log('Added to cart:', response.data);
// //           })
// //           .catch(error => {
// //             console.error('Error adding to cart:', error);
// //           });
// //       };

// //   return (
// //     <div className="product-list">
// //       {products.map((product) => (
// //         <ProductCard key={product.id} product={product} addToCart={addToCart} />
// //       ))}
// //     </div>
// //   );
// // };


// // export default ProductList;