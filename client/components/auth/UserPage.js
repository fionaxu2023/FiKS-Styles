import React from 'react';
import OrderHistory from "./user/OrderHistory"
import { useSelector } from 'react-redux';
import EditProfile from './user/EditProfile';

const UserPage=()=>{
    const username=useSelector(state=>state.auth.me.firstName)
    {username ? (window.alert(`Welcome Back,${username}`)) : (window.alert("Welcome, New friend"))}

    return (
        <div>
            <EditProfile/>
        </div>
    )
}

export default UserPage