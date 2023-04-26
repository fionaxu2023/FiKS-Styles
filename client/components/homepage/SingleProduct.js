import React , { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart,addItemToCart,fetchCartItems } from "../../store/cartSlice";
import { useNavigate} from "react-router-dom";
import{addToLocalStorageCart, getLocalStorageCart } from "../../store/localCart"

const Product=(props)=>{
    const { product } = props
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [quantity, setQuantity] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    const userId= useSelector(state=>state.auth.me.id)
    

    const handleAddToCart = (product,quantity) => {
      if (userId) {
         dispatch(addItemToCart({ userId, productId: product.id, quantity }))}
        else {
          addToLocalStorageCart(product,quantity);
          
        }
      };
  
  
  const {
    palette: { neutral },
  } = useTheme();

  return (
    <Box width="80%" margin="80px auto">
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <img
          alt={product.name}
          width="300px"
          height="400px"
          src={product.imageURL}
          onClick={() => navigate(`/product/${product.id}`)}
          style={{ cursor: "pointer" }}
        />
        <Box
          display={isHovered ? "block" : "none"}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.neutral[100]}
              borderRadius="3px"
            >
              <IconButton onClick={() => setQuantity(Math.max(quantity - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{quantity}</Typography>
              <IconButton onClick={() => setQuantity(quantity + 1)}>
                <AddIcon />
              </IconButton>
            </Box>

            <Button
              onClick={() => handleAddToCart( product, quantity)}
              sx={{ backgroundColor: shades.primary[300], color: "white" }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt="3px">
        <Typography color={neutral.dark}>
          {product.category}
        </Typography>
        <Typography>{product.name}</Typography>
        <Typography fontWeight="bold">${product.price}</Typography>
      </Box>
    </Box>
  );
};

export default Product