import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import StraightenIcon from '@mui/icons-material/Straighten';
import TwitterIcon from '@mui/icons-material/Twitter';
import styled from "@emotion/styled";
import { setIsMenuOpen }  from "../../store/menuslice"
import { useNavigate } from "react-router-dom";
import {logout} from "../../store/authSlice"

const FlexBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Menu =()=>{
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
 const navigate = useNavigate();
 const dispatch = useDispatch();
  const isMenuOpen = useSelector((state) =>state.menu.isMenuOpen);

  const logoutAndRedirectHome = () => {
    dispatch(logout());
    dispatch(setIsMenuOpen())
    windows.alert("You have Logged out")
    navigate('/');
  };

  const handlesingup =()=>{
    dispatch(logout());
    dispatch(setIsMenuOpen())
    navigate('/signup');
  }

  const handlelogin=()=>{
    dispatch(setIsMenuOpen())
    navigate('/login');
  }

  const handlesizechart=()=>{
    dispatch(setIsMenuOpen())
    navigate("/sizechart")
  }
 
  const handleshare=()=>{
    dispatch(setIsMenuOpen())
    navigate("/share")
  }
return (
    <Box 
     display={ isMenuOpen ? "block" : "none"}
     position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
      color="black" 
      backgroundColor="rgba(0, 0, 0, 0.4)"
    >
      <Box
        position="fixed"
        right="0"
        bottom="0"
        height="100%"
        backgroundColor="white"
        color="black"
      >
        <Box padding="30px" overflow="auto" height="100%" margin="auto">
          <FlexBox mb="15px" >
            <Typography variant="h3">MENU</Typography>
            <IconButton onClick={() => dispatch(setIsMenuOpen())}>
              <CloseIcon />
            </IconButton>
          </FlexBox>
           {isLoggedIn ? (
          <FlexBox  p="15px 0" onClick={logoutAndRedirectHome}>
          <IconButton>
            <PeopleOutlinedIcon size={30}/>
            <Typography variant="h4">Logout</Typography>
            </IconButton>
          </FlexBox>) : (
            <FlexBox  p="15px 0" onClick={handlelogin}>
            <IconButton>
              <PeopleOutlinedIcon size={30}/>
              <Typography variant="h4">Login</Typography>
              </IconButton>
            </FlexBox>
            
          )}

           <FlexBox  p="15px 0" onClick={handlesingup}>
            <IconButton>
              <PeopleOutlinedIcon size={30}/>
              <Typography variant="h4">SignUp</Typography>
              </IconButton>
            </FlexBox>

          <FlexBox  p="15px 0" onClick={handlesizechart} >
          <IconButton>
            <StraightenIcon size={30}/>
            <Typography variant="h4">SizeChart</Typography>
            </IconButton>
            </FlexBox>

            <FlexBox  p="15px 0" onClick={handleshare}>
                <IconButton>
              <TwitterIcon size={30} />
            </IconButton>
            </FlexBox>

          </Box>
        

      </Box>
    </Box>
  );
};

export default Menu