import React , { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, useTheme, Button,TextField } from "@mui/material";
import { useNavigate} from "react-router-dom";
import { shades } from "../../../theme";
import { getAllUser, deleteUser} from "../../../store/userSlice"

const SingleUser=(props)=>{
    const { user } = props
    const dispatch=useDispatch()
    const navigate=useNavigate() 
   
    const handeldelete = async(userId)=>{
      await dispatch(deleteUser(userId))
      dispatch(getAllUser())
    }


  const {
    palette: { neutral },
  } = useTheme();

  return (
    <Box width="80%" margin="80px auto">
      <Box mt="3px">
        <Typography color={neutral.dark}>
          {user.fullName}
        </Typography>
        <Typography>{user.username}</Typography>
      </Box>
      <Box
        position="relative"
      >
        {/* <Box
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        > */}
          <Box display="flex" justifyContent="space-between">
            <Button
              onClick={()=>handeldelete(user.id)}
              sx={{ backgroundColor: shades.primary[300], color: "white" }}
            >
              Deactivate
            </Button>
          </Box>

        {/* </Box> */}
      </Box>

      
    </Box>
  );
};

export default SingleUser;