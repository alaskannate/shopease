import React from "react";
// import { useSelector, useDispatch } from 'react-redux';
import LogoutBtn from "./buttons/LogoutBtn";



export default function Home(){


    return(
        <div>
            <h1>Welcome to ShopEase! Your one-stop shop for all your needs.</h1>
            <LogoutBtn />
        </div>
    )
}