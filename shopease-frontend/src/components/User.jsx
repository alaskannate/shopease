//add {useContext}
import React from "react";
// import { UserContext } from '../contexts/UserContext';



export default function User({user}) {
    // const user = useContext(UserContext)
    return (
        <div>
            <h1>User</h1>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            {/* add other user details */}
        </div>
    )
}