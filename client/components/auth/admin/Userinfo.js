import React, { useEffect ,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  Box, Typography,  } from "@mui/material";
import { getAllUser } from "../../../store/userSlice"
import SingleUser from "./SingleUser"
const Userinfo=()=>{
    const allaccounts = useSelector((state)=> state.users.allUsers);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUser());
    }, [dispatch]);
   
     const users = allaccounts.filter(
        (user) => user.isAdmin === false
      );
      
      return (
        <Box width="100%" textAlign="center">
          <Typography variant="h4" textAlign="center">All USERS</Typography>
          
          <Box
             display="grid"
             gridTemplateColumns="repeat(auto-fill, 300px)"
             justifyContent="center"
             rowGap="20px"
             columnGap="1.33%"
          >
             {users.map((user) => (
           <div key={user.id}>
            <SingleUser user = {user} />
           </div>
         ))}
          </Box>

          
        </Box>
      );
    };

export default Userinfo