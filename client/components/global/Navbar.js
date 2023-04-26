import React from "react";
import {useDispatch, useSelector} from "react-redux"
import { useState } from "react";
import {Badge, Box, IconButton } from "@mui/material"
import {PersonOutline,ShoppingBagOutlined,MenuOutlined,SearchOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { setIsCartOpen } from "../../store/cartSlice";
import { setIsMenuOpen }  from "../../store/menuslice"
import {getLocalStorageCart} from "../../store/localCart"

const Navbar =()=>{
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const [cartstate,SetCartstate]=useState(false)
  const Navigate= useNavigate()
  const dispatch = useDispatch()
  const cart= useSelector(state=>state.cart)
  const userId=useSelector((state)=>state.auth.me.id)
  const unloggedincart= getLocalStorageCart()

    return (
     <Box display="flex"
       alignItems="center"
       width="100%"
       height="60px"
       color="black"
       top="o"
       left="0"
       zIndex="1"
       >
       <Box 
       width="80%"
       margin ="auto"
       display="flex"
       justifyContent="space-between"
       alignItems="center">
         <Box
         onClick={
          ()=>Navigate("/")
         } sx={{ "&:hover": { cursor: "pointer" } }}
         color={shades.secondary[700]}>
            FiKS-Styles
         </Box>
         <Box
         display="flex"
         justifyContent="space-between"
         columnGap="20px"
         zIndex="2">
          <IconButton >
            <SearchOutlined></SearchOutlined>
          </IconButton>
          {isLoggedIn ? (
          <IconButton onClick={() => {
                Navigate("/user")}} >
            <PersonOutline/>
          </IconButton>) : (
           <IconButton onClick={() => {
            Navigate("/guest")}}>
              <PersonOutline/>
            </IconButton>
          )}
          
          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}
          ></Badge>
          {/* ):(<Badge
            badgeContent={unloggedincart.length}
            color="secondary"
            invisible={unloggedincart.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}
          ></Badge>)} */}
          

          <IconButton 
          onClick={()=>dispatch(setIsCartOpen())}>
            <ShoppingBagOutlined/>
          </IconButton>

          <IconButton 
          onClick={()=>dispatch(setIsMenuOpen())}>
            <MenuOutlined/>
          </IconButton>
         </Box>
       </Box>
     </Box>
    )
  }
  
  export default Navbar 