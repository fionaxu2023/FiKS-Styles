import React from 'react';
import AdminPage from "./AdminPage"
import UserPage from "./UserPage"
import { useSelector } from 'react-redux';
const User=()=>{
const isAdmin = useSelector((state=>state.auth.me.isAdmin))
    return (
        <div>
            {isAdmin ? (<AdminPage/>) : (
                <UserPage />
            )}
        </div>
    )
    }

export default User
