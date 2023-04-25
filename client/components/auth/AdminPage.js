import React from 'react';
import AdminProducts from './admin/AdminProduct';
import { useSelector } from 'react-redux';

const AdminPage=()=>{
    const username=useSelector(state=>state.auth.me.firstName)
    window.alert(`Welcome Back,${username}`)
    return (
        <AdminProducts/>
    )
}

export default AdminPage