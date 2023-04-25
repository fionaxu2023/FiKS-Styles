import React,{ useEffect } from "react";
import { useState } from "react";
import { Box, Button, Divider, IconButton, Typography,TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {decreaseCount,increaseCount,removeFromCart,setIsCartOpen } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import {fetchCartItems, addItemToCart , updateCartItemQuantity, removeItemFromCart} from "../../store/cartSlice"
import { v4 as uuidv4 } from "uuid"
import {getLocalStorageCart,updateLocalStorageCartItemQuantity,removeLocalStorageCartItem,} from "../../store/localCart";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`


const Cart =()=>{

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart)
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const [cartItems, setCartItems] = useState([]);
  const [newQuantity, setnewQuantity] = useState("");
 
  const totalQuantity = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0)
  const userId = useSelector((state) => state.auth.me.id);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const totalPrice =  cart.reduce(
    (acc, item) => acc + (item.length ? item.quantity * item.product.price : 0),
    0
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItems(userId));
    }
  }, [dispatch,userId ]);
  
  const handleDeleteItem = async(productId) => {
    if (userId) {
      await dispatch(removeItemFromCart({ userId, productId }));
      dispatch(fetchCartItems(userId));
    } else {
      dispatch(removeFromCart({ productId }))
    }
  };

  const handleQuantityChange = async(productId, newQuantity) => {
    if (!newQuantity) {
      return;
    }
    if (userId) {
        await dispatch(updateCartItemQuantity({ userId, productId, newQuantity }))
        dispatch(fetchCartItems(userId));
    } 
  };
 
  

    return (
      <Box
      display={isCartOpen ? "block" : "none"}
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
      backgroundColor="rgba(0, 0, 0, 0.4)"
    >
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width="max(400px, 30%)"
        height="100%"
        backgroundColor="white"
        
      >
        <Box padding="30px" overflow="auto" height="100%">
          <FlexBox mb="15px">
            <Typography variant="h3">SHOPPING BAG ({totalQuantity})</Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <CloseIcon />
            </IconButton>
          </FlexBox>


          <Box >
            {cart.length===0? (<Typography fontWeight="bold">
            Your cart is empty</Typography>): (
              <Box>
            {cart.map((item) => {
              const product= userId && item.product ? item.product : item;
            return(
              <Box key={uuidv4()}>
                <FlexBox p="15px 0">
                  <Box flex="1 1 40%">
                    <img
                      alt={product.name}
                      width="123px"
                      height="164px"
                      src={product.imageURL}
                    />
                  </Box>
                  <Box flex="1 1 60%">
                    <FlexBox mb="5px">
                      <Typography fontWeight="bold">
                        {product.name}
                      </Typography>
                      <IconButton
                        onClick={()=>handleDeleteItem(product.id)}
                      >
                        <CloseIcon />
                       </IconButton>
                    </FlexBox>
                    <Typography>{product.shortDescription}</Typography>
                    <FlexBox m="15px 0">
                      <Box
                        display="flex"
                        alignItems="center"
                        border={`1.5px solid ${shades.neutral[700]}`}
                      >
                        {/* <TextField label={item.quantity} variant="standard" value = {newQuantity} size="small" onChange={(event) => setnewQuantity(event.target.value)} />
                        <IconButton onClick= {()=>handleQuantityChange(product.id, newQuantity)}>
                        <AddCircleOutlineIcon fontSize="small" />
                        </IconButton> */}
                        <input
                          type="number"
                          value={item.quantity}
                          min="1"
                          onChange={(e) =>
                            handleQuantityChange(
                              product.id,
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </Box>
                      <Typography fontWeight="bold">
                        ${product.price}
                      </Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            )})} </Box>)}
          </Box>

         
          <Box m="20px 0">
            <FlexBox m="20px 0">
              <Typography fontWeight="bold">SUBTOTAL</Typography>
              <Typography fontWeight="bold">${totalPrice}</Typography>
            </FlexBox>
            
              {isLoggedIn ? (
            <Button
              sx={{
                backgroundColor: shades.primary[500],
                color: "white",
                borderRadius: 0,
                minWidth: "100%",
                padding: "20px 40px",
                m: "20px 0",
              }}
              onClick={() => {
                navigate("/checkout");
                dispatch(setIsCartOpen({}));
              }}
            >
              Checkout
            </Button>):(
             
              
              <Button
              sx={{
                backgroundColor: shades.primary[500],
                color: "white",
                borderRadius: 0,
                minWidth: "100%",
                padding: "20px 40px",
                m: "20px 0",
              }}
              onClick={() => {
                navigate("/login");
                dispatch(setIsCartOpen({}));
              }}
            >
              Login & Checkout
            </Button>)}
             
            
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;