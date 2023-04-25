import React from "react";
import { Box, Button, IconButton, Typography,TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct, updateProduct,fetchProducts } from "../../../store/productSlice";
import { shades } from "../../../theme";

const AdminDetail = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product= useSelector(state=> state.products.singleProduct)
  const [price, setPrice]=useState("")


  useEffect(()=>{
   dispatch(getSingleProduct(productId))
 },[dispatch])

const submithandel = async(event)=>{
      event.preventDefault();
      await dispatch(updateProduct({productId, price}))

     }
 

  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        <Box flex="1 1 40%" mb="40px">
          <img
            alt={product.name}
            width="100%"
            height="100%"
            src={product.imageURL}
            style={{ objectFit: "contain" }}
          />
        </Box>

        <Box flex="1 1 50%" mb="40px">

          <Box m="65px 0 25px 0">
            <Typography variant="h3">{product.name}</Typography>
            <Typography>${product.price}</Typography>
            <Typography sx={{ mt: "20px" }}>
              {product.longDescription}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" minHeight="50px">
          <Box component="form" autoComplete="off" onSubmit={submithandel}>
         <TextField  label="price" variant="standard" value = {price} onChange={(event) => setPrice(event.target.value)}/>
         <Button onClick= {submithandel} sx={{ backgroundColor: shades.primary[300], color: "white" }}>Submit Change</Button>
         </Box>
          </Box>
          <Box>
            <Typography>CATEGORIES: {product.category}</Typography>
          </Box>
        </Box>
      </Box>

      

    </Box>
  );
};

export default AdminDetail;