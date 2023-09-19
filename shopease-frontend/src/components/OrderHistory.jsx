import React, { useContext } from "react";
import { OrderContext } from '../contexts/OrderContext';
// import { useSelector, useDispatch } from 'react-redux';



export default function ProductCard(){
    const order = useContext(OrderContext)

    return(
        <div>
            <h1>Order History </h1>
            Product Name: {order.name}
        </div>
    )
}