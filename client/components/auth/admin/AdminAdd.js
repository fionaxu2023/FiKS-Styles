import React, {useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import {addProduct, fetchProducts } from "../../../store/productSlice"
import { Box, Button, TextField } from "@mui/material";
import { shades } from "../../../theme";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const AdminAdd =()=>{
    const dispatch = useDispatch()
   const [name, setName]=useState("")
   const [price, setPrice]=useState("")
   const [shortDescription, setShortDescription]=useState("")
   const [longDescription,setLongDescription]=useState("")
   const [category,setCategory]=useState("")
   const [imageURL,setImageURL]=useState("")

   const submithandel = async(event)=>{
    event.preventDefault();
    await dispatch(addProduct({ name,price,shortDescription, longDescription, category,imageURL }))
    setName("")
    setPrice("")
    setShortDescription("")
    setLongDescription("")
    setCategory("")
    setImageURL("")
    dispatch(fetchProducts());
   }

  


    return (
       <Box width="80%" m="80px auto" alignItems="center" margin="auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px" alignItems="center">
          <Box component="form" autoComplete="off" >
          <TextField  label="name" variant="outlined" value = {name} onChange={(event) =>  setName(event.target.value)}/>
         <TextField  label="price" variant="outlined" value = {price} onChange={(event) => setPrice(event.target.value)}/>
         <TextField  label="shortDescription" variant="outlined" value = {shortDescription} onChange={(event) => setShortDescription(event.target.value)}/>
         <TextField  label="longDescription" variant="outlined" value = {longDescription} onChange={(event) => setLongDescription(event.target.value)}/>
         <TextField  label="imageURL" variant="outlined" value = {imageURL} onChange={(event) => setImageURL(event.target.value)}/>
         <FormControl sx={{ m: 1, minWidth: 120}}>
        <InputLabel >Category</InputLabel>
        <Select
          value={category}
          label="Category"
          onChange={(event) => setCategory(event.target.value)}
        >
          <MenuItem value="Top">Top</MenuItem>
          <MenuItem value="Bottom">Bottom</MenuItem>
          <MenuItem value="Dress">Dress</MenuItem>
        </Select>
      </FormControl>

         <Button onClick= {submithandel} sx={{ backgroundColor: shades.primary[300], color: "white" }}>Add Product</Button>
         </Box>
          
       
        </Box>
      </Box>

      

    
  );
};


export default AdminAdd