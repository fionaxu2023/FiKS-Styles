import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addToCart } from "../../store/cartSlice";
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct } from "../../store/productSlice";
import {addItemToCart,fetchCartItems} from "../../store/cartSlice"
import {addToLocalStorageCart} from "../../store/localCart"

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product= useSelector(state=> state.products.singleProduct)
  const userId= useSelector(state=>state.auth.me.id)
  const [quantity, setQuantity] = useState(1);

  useEffect(()=>{
   dispatch(getSingleProduct(productId))
 },[dispatch])

 const handleAddToCart = (product,quantity) => {
  if (userId) {
     dispatch(addItemToCart({ userId, productId: product.id, quantity }))}
    else {
      addToLocalStorageCart(product,quantity);
    }
  };
 

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
          <Button
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
              }}
              onClick={() => handleAddToCart( product, quantity)}
            >
              ADD TO CART
            </Button> 
          </Box>
          <Box>
            <Typography>CATEGORIES: {product.category}</Typography>
          </Box>
        </Box>
      </Box>

      

    </Box>
  );
};

export default ProductDetails;