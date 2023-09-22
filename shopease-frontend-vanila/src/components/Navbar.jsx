import React from "react"
import { Link } from 'react-router-dom';
import "../styles.css"




export default function Navbar() {

    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/cart">Cart</Link>
        </nav>
    )
}