import React,{ useEffect } from "react";
import { useState } from "react";
import { Box, Button, Divider, IconButton, Typography,TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {setIsCartOpen } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import {fetchCartItems , updateCartItemQuantity, removeItemFromCart} from "../../store/cartSlice"
import { v4 as uuidv4 } from "uuid"
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
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
  const localStorageCart= getLocalStorageCart();
  const [cartItems, setCartItems] = useState([]);
  const [newQuantity, setnewQuantity] = useState("");
  const isCartOpen= useSelector((state) => state.cart.isCartOpen)
  
  const userId = useSelector((state) => state.auth.me.id);
  const totalQuantity = cartItems && cartItems.length > 0 ? cartItems.reduce((total, item) => {
    return total + item.quantity;
}, 0) : 0;

const totalPrice = cartItems && cartItems.length ? cartItems.reduce((acc, item) => {
  const price = userId && item.product ? item.product.price : item.price;
  return acc + (price ? item.quantity * price : 0);
}, 0) : 0;

  
console.log(totalPrice)
console.log(cartItems)

useEffect(() => {
  if (userId) {
    if (JSON.stringify(cart) !== JSON.stringify(cartItems)) {
      dispatch(fetchCartItems(userId));
      setCartItems((prevCartItems) => {
        if (
          JSON.stringify(cart) !== JSON.stringify(prevCartItems)
        ) {
          return cart;
        }
        return prevCartItems;
      });
    }
  } else {
    const localStorageCart = getLocalStorageCart();
    setCartItems((prevCartItems) => {
      if (
        JSON.stringify(localStorageCart) !== JSON.stringify(prevCartItems)
      ) {
        return localStorageCart;
      }
      return prevCartItems;
    });
  }
}, [dispatch, userId, cart, localStorageCart ]);



const handleDeleteItem = (productId) => {
  if (userId) {
       dispatch(removeItemFromCart({ userId, productId }));
      // setCartItems((prevCartItems) =>
      //  prevCartItems.filter((item) =>
      //    item.id != productId ))
   }
   
   else{
      removeLocalStorageCartItem(productId);
      setCartItems(getLocalStorageCart());
    }
    console.log(cartItems)
};


const handleQuantityChangeDecrease = (productId, newQuantity) => {
  if (userId) {
       dispatch(updateCartItemQuantity({ userId, productId, quantity: newQuantity }))
       setCartItems((prevCartItems) =>
       prevCartItems.map((item) =>
         item.id === productId ? { ...item, quantity: newQuantity } : item
       )
     );
  } 
  else {
    updateLocalStorageCartItemQuantity(productId, newQuantity);
    setCartItems(getLocalStorageCart());
  }
};

const handleQuantityChangeIncrease =  (productId, newQuantity) =>{
  if (userId) {
        dispatch(updateCartItemQuantity({ userId, productId, quantity: newQuantity }))
       setCartItems((prevCartItems) =>
       prevCartItems.map((item) =>
         item.id === productId ? { ...item, quantity: newQuantity } : item
       )
     );
  } 
  else {
    updateLocalStorageCartItemQuantity(productId, newQuantity);
    setCartItems(getLocalStorageCart());
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
            <IconButton onClick={()=>dispatch(setIsCartOpen())}>
              <CloseIcon />
            </IconButton>
          </FlexBox>


          <Box>
       {!cartItems || cartItems.length === 0 ? (
       <Typography fontWeight="bold">Your cart is empty</Typography>
      ) : (
    <Box>
      {cartItems && cartItems.map((item) => {
        const product =
          userId && item.product ? item.product : item;
        return (
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
                  <IconButton onClick={() => handleDeleteItem(product.id)}>
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
                    <IconButton
                    disabled={!product.id}
                    onClick={() =>
                      handleQuantityChangeDecrease(
                        product.id,
                        parseInt(item.quantity - 1)
                      )
                    }
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton
                    disabled={!product.id}
                    onClick={() =>
                      handleQuantityChangeIncrease(
                        product.id,
                        parseInt(item.quantity + 1)
                      )
                    }
                  >
                    <AddIcon />
                    </IconButton>
                  </Box>
                  <Typography fontWeight="bold">
                    ${product.price}
                  </Typography>
                </FlexBox>
              </Box>
            </FlexBox>
            <Divider />
          </Box>
        );
      })}
    </Box>
  )}
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
                navigate("/checkout");
                dispatch(setIsCartOpen({}));
              }}
            >
              Checkout as Guest
            </Button>)
            }
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;