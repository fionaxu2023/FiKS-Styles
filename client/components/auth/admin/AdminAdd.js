import React, {useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import {addProduct, fetchProducts } from "../../../store/productSlice"
import { Box, Button, TextField } from "@mui/material";
import { shades } from "../../../theme";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const AdminAdd = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageURL, setImageURL] = useState("");

  const submithandel = async (event) => {
    event.preventDefault();
    await dispatch(
      addProduct({
        name,
        price,
        shortDescription,
        longDescription,
        category,
        imageURL,
      })
    );
    setName("");
    setPrice("");
    setShortDescription("");
    setLongDescription("");
    setCategory("");
    setImageURL("");
    dispatch(fetchProducts());
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Box component="form" width="50%" onSubmit={submithandel}>
        <TextField
          label="name"
          variant="outlined"
          value={name}
          onChange={(event) => setName(event.target.value)}
          sx={{ mb: 2, width: "100%" }}
        />
        <TextField
          label="price"
          variant="outlined"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          sx={{ mb: 2, width: "100%" }}
        />
        <TextField
          label="shortDescription"
          variant="outlined"
          value={shortDescription}
          onChange={(event) => setShortDescription(event.target.value)}
          sx={{ mb: 2, width: "100%" }}
        />
        <TextField
          label="longDescription"
          variant="outlined"
          value={longDescription}
          onChange={(event) => setLongDescription(event.target.value)}
          sx={{ mb: 2, width: "100%" }}
        />
        <TextField
          label="imageURL"
          variant="outlined"
          value={imageURL}
          onChange={(event) => setImageURL(event.target.value)}
          sx={{ mb: 2, width: "100%" }}
        />
        <FormControl sx={{ m: 1, minWidth: 120, mb: 2, width: "100%" }}>
          <InputLabel>Category</InputLabel>
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

        <Button
          onClick={submithandel}
          sx={{ backgroundColor: shades.primary[300], color: "white", width: "100%" }}
          variant="contained"
        >
          Add Product
        </Button>
      </Box>
    </Box>
  );
};



export default AdminAdd