import React from "react";
import {getSingle}from "../../../store/userSlice"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Box from "@mui/material/Box";
import { useTheme } from "@emotion/react";
import { Typography, Pagination } from "@mui/material";
const Profile =()=>{

    const userId= useSelector(state=>state.auth.me.id)
    const profile=useSelector(state=>state.users.singleUser)
   const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getSingle(userId))
      },[dispatch])

      const {
        palette: { neutral },
      } = useTheme();
    
      return (
        <Box
  width="80%"
  margin="80px auto"
  display="flex"
  flexDirection="column"
  alignItems="center"
>
  <Box mt="3px">
    <Typography color={neutral.dark}>
      {profile.fullName}
    </Typography>
    <Typography>{profile.username}</Typography>
  </Box> 
</Box>
      );
    };
export default Profile