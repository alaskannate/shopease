import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";



export default function ShoppingCart({ cartItems }) {
    const cart = useContext(CartContext)

    return (
        <div>
            <h1>Cart</h1>
            <div>
                {cartItems.map(item => (
                    <div key={item.id}>{item.name}</div>
                ))}
            </div>
        </div>
    )
}