import React from 'react';
import axios from 'axios';

const AddToCartBtn = ({ productId, userId }) => {
  const addToCart = () => {
    axios.post(`/api/${userId}/cart/add`, { productId })
      .then(response => {
        console.log('Added to cart:', response.data);
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
      });
  };

  return (
    <button onClick={addToCart}>Add to Cart</button>
  );
};

export default AddToCartBtn;
