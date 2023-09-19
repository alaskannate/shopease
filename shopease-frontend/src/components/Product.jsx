//add useContext
import React from "react";
// import { ProductContext } from '../contexts/ProductContext';
// import { useSelector, useDispatch } from 'react-redux';



export default function Product({product}) {
    // const product = useContext(ProductContext)

    return (
        <div>
            <h1>Products</h1>

            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
            {/* Product Name: {product.name} */}
        </div>
    )
}