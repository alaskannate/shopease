import React, { useContext } from "react";
import { WishlistContext } from '../contexts/WishlistContext';



export default function UserProfile(){
    const wishlist = useContext(WishlistContext)
    return(
        <div>
            <h1>Wishlist</h1>
            username: {user.name}
        </div>
    )
}