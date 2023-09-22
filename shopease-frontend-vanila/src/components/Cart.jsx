import React from "react";
import { Link } from "react-router-dom"



export default function ShoppingCart({ cartItems }) {

    return (
        <div>
            <h1>Cart</h1>
            <Link to="/wishlist">Wishlist</Link>
            <div>
                {cartItems.map(item => (
                    <div key={item.id}>{item.name}</div>
                ))}
            </div>
        </div>
    )
}