import React from "react";
// import { useSelector, useDispatch } from 'react-redux';
import LogOutBtn from "./components/buttons/LogOutBtn";



export default function Home(){


    return(
        <div>
            <h1>Welcome to ShopEase! Your one-stop shop for all your needs.</h1>
            <LogOutBtn />
        </div>
    )
}