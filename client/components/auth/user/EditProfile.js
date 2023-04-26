import React from "react"
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {updateUser, getAllUser} from "../../../store/userSlice"
import { shades } from "../../../theme";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Button,Typography } from "@mui/material";


const EditProfile =()=>{
    const userId = useSelector((state) => state.auth.me.id);
    const dispatch=useDispatch()
    const [firstName, setfirstName]=useState("")
   const [lastName, setlastName]=useState("")
   const [username, setusername]=useState("")
   const [password, setpassword]=useState("")
   const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


   const submithandel = async(event)=>{
    event.preventDefault();
    await dispatch(updateUser({userId, firstName, lastName,username,password}))
    dispatch(getAllUser())
   }
  
   return (
   <div>
    <Box
  width="80%"
  margin="80px auto"
  display="flex"
  flexDirection="column"
  alignItems="center"
>
  <Typography variant="h3" textAlign="center">
    Update your Profile
  </Typography>
  <Box
    component="form"
    display="flex"
    flexDirection="column"
    alignItems="center"
    onSubmit={submithandel}
    sx={{
      '& > :not(style)': { m: 1, width: '100%' },
    }}
    noValidate
    autoComplete="off"
  >
    <TextField
      label="FirstName"
      variant="standard"
      value={firstName}
      onChange={(event) => setfirstName(event.target.value)}
    />
    <TextField
      label="LastName"
      variant="standard"
      value={lastName}
      onChange={(event) => setlastName(event.target.value)}
    />
    <TextField
      label="UserName"
      variant="standard"
      value={username}
      onChange={(event) => setusername(event.target.value)}
    />
    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
      <InputLabel>Password</InputLabel>
      <OutlinedInput
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(event) => setpassword(event.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
    <Button
      onClick={submithandel}
      sx={{ backgroundColor: shades.primary[300], color: 'white', width: '100%' }}
    >
      Submit Change
    </Button>
  </Box>
</Box>
    </div>)
   
   
}


export default EditProfile