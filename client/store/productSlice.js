import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/getAll', async() => {
    try {
        const { data } = await axios.get(`api/products`);
        return data;
    }
    catch (error) {
        console.log(error);
    }
});

export const getSingleProduct = createAsyncThunk(
    'products/getSingleProduct',
    async (productId) => {
      try {
        const { data } = await axios.get(`/api/products/${productId}`);
        return data;
      } catch (error) {
        return error.message;
      }
    }
  );

  export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (productId) => {
      try {
        const { data } = await axios.delete(`/api/products/${productId}`);
       return data;
      } catch (error) {
        throw error
      }
    }
  );

  export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ productId, price }) => {
      try {
        const {data} = await axios.put(`/api/products/${productId}`,{
          price
        })
        return data
      } catch (error) {
        next (error)
      }
    }
  );
  export const addProduct = createAsyncThunk(
    'products/addProduct',
    async ({ name, price, shortDescription, longDescription, category, imageURL }) => {
      try {
        const { data } = await axios.post("/api/products",{
          name, price, shortDescription, longDescription, category, imageURL 
        });
        return data;
      } catch (error) {
        return error.message;
      }
    }
  );

const initialState = {
    allProducts: [],
    singleProduct: {},
    status: 'idle',
  error: null,
  };

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.allProducts= action.payload;
            })
            .addCase(getSingleProduct.fulfilled, (state, action) => {
               state.singleProduct=action.payload;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
              state.status = 'succeeded';
              state.singleProduct = action.payload;
            })
            .addCase(updateProduct.fulfilled,(state,action)=>{
                state.status="succeeded";
                state.singleProduct = action.payload;
            })
            .addCase(addProduct.fulfilled,(state,action)=>{
              state.status="succeeded";
              state.singleProduct = action.payload;
          })
    },
});


export default productSlice.reducer;