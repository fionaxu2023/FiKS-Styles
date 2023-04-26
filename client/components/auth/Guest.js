import React from 'react';
import { TextField, Typography } from '@mui/material';
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { shades } from "../../theme";
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import {fetchUserName} from "../../store/orderSlice"
import {fetchProducts} from "../../store/productSlice"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Alert} from '@mui/material';
const Guest = () => {
  const dispatch=useDispatch()
  const [userName,setUserName]=useState("")
  const products = useSelector((state) => state.products.allProducts);
  const historyorder=useSelector(state=>state.order.guestorder)
  const navigate=useNavigate()
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const submithandel = (event)=>{
    event.preventDefault();
    dispatch(fetchUserName({ userName: userName.toString() }))
    if(!historyorder||historyorder.length===0){
      <Alert severity="error">NOT FOUND</Alert>
    }
   }

    return (
      <div>
     <Box width="80%" margin="80px auto" display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h3" textAlign="center">
       Find Your Order
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
          label="userName"
          variant="standard"
          value={userName}
          onChange={(event) =>setUserName(event.target.value)}
        />
        <Button
          onClick={submithandel}
          sx={{ backgroundColor: shades.primary[300], color: 'white', width: '100%' }}
        >
          Search
        </Button>
      </Box>
    </Box>

    <Box
  margin="0 auto"
  maxWidth="800px"
  display="grid"
  gridTemplateColumns="repeat(auto-fill, 300px)"
  justifyContent="space-around"
  rowGap="20px"
  columnGap="1.33%"
>
        <>
          {historyorder.map((order, index) => {
            return (
              <div key={order.id}>
                <Box
                  sx={{
                    padding: "10px",
                    borderRadius: "5px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "20px",
                      marginBottom: "10px",
                    }}
                  >
                    Order {index + 1}
                  </Typography>
                  {order.products.map(({ productId, quantity }) => {
                    const matchingProduct = products.find(
                      (product) => product.id === productId
                    );
                    return (
                      <Box
                        key={productId}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "15px",
                        }}
                      >
                        <Box
                          sx={{
                            marginRight: "20px",
                            position: "relative",
                            height: "100px",
                            width: "100px",
                          }}
                        >
                          <img
                            alt={matchingProduct.name}
                            height="100%"
                            width="100%"
                            src={matchingProduct.imageURL}
                            onClick={() => navigate(`/product/${productId}`)}
                            style={{ cursor: "pointer" }}
                          />
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <Typography sx={{ fontWeight: "bold" }}>
                            {matchingProduct.name}
                          </Typography>
                          <Typography>
                            Quantity: {quantity} x ${matchingProduct.price}
                          </Typography>
                          <Typography>Total: ${matchingProduct.price * quantity}</Typography>
                          <Typography>Bought at: {order.createdAt}</Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </div>
            );
          })}
        </>
      
    </Box>
        </div>)
       
       
    }
  
  export default Guest;