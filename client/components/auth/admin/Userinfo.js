import React, { useEffect ,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton, Box, Typography, useTheme, Button,TextField } from "@mui/material";
import { useNavigate} from "react-router-dom";
import { shades } from "../../../theme";
import { getAllUser,addUser } from "../../../store/userSlice"
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
        <Box width="80%" margin="80px auto">
          <Typography variant="h4" textAlign="center">All USERS</Typography>
          
          <Box
            margin="0 auto"
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