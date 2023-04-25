import React from 'react';
import OrderHistory from "./user/OrderHistory"
import { useSelector } from 'react-redux';

const UserPage=()=>{
    const username=useSelector(state=>state.auth.me.firstName)
    window.alert(`Welcome Back,${username}`)

    return (
        <div>
            here is your order
            <OrderHistory/>
        </div>
    )
}

export default UserPage