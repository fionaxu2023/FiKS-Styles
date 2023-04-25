import React , { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, useTheme, Button,TextField } from "@mui/material";
import { useNavigate} from "react-router-dom";
import { shades } from "../../../theme";
import { fetchProducts, deleteProduct} from "../../../store/productSlice"

const AdminProduct=(props)=>{
    const { adminproduct } = props
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [isHovered, setIsHovered] = useState(false);
   
    const handeldelete = async(productId)=>{
      await dispatch(deleteProduct(productId))
      dispatch(fetchProducts())
    }


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
          alt={ adminproduct.name}
          width="300px"
          height="400px"
          src={ adminproduct.imageURL}
          onClick={() => navigate(`/admin/${ adminproduct.id}`)}
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
            <Button
              onClick={()=>handeldelete(adminproduct.id)}
              sx={{ backgroundColor: shades.primary[300], color: "white" }}
            >
              Out of Stock
            </Button>
          </Box>

        </Box>
      </Box>

      <Box mt="3px">
        <Typography color={neutral.dark}>
          {adminproduct.category}
        </Typography>
        <Typography>{adminproduct.name}</Typography>
        <Typography fontWeight="bold">${adminproduct.price}</Typography>
      </Box>
    </Box>
  );
};

export default AdminProduct;