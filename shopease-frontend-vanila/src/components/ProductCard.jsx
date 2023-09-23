import React from 'react';
// import AddToCartBtn from './buttons/AddToCartBtn';

const ProductCard = ({ product }) => {
  return (
    <div className='product-card'>
      <img src={product.imageUrl} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.price}</p>
      {/* <AddToCartBtn productId={product._id} userId={user._id}/> */}
    </div>
  );
};

export default ProductCard;









// import React from 'react';

// import "../styles.css"




// const ProductCard = ({ product, addToCart }) => {
//     return (
//       <div className="product-card">
//         <img src={product.imageUrl} alt={product.name} />
//         <h2>{product.name}</h2>
//         <p>{product.description}</p>
//         <p>{product.price}</p>
//         <button onClick={() => addToCart(product._id)}>Add to Cart</button>
//         {/* Assuming you'll handle buyNow later */}
//         <button>Buy Now</button>
//       </div>
//     );
//   };
  

// export default ProductCard;
