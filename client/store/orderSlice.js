import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrder = createAsyncThunk('orders/getAll', async() => {
    try {
        const { data } = await axios.get(`api/order`);
        return data;
    }
    catch (error) {
        console.log(error);
    }
});

export const fetchUserHistory =createAsyncThunk("orders/getbyuser",
async (userId) => {
    try {
      const { data } = await axios.get(`/api/order/${userId}`);
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const fetchUserName = createAsyncThunk(
    "orders/getbyguest",
    async ({ userName }) => {
      try {
        const { data } = await axios.get(`/api/order?userName=${userName}`)
        return data 
      } catch (error) {
        return error.message;
      }    
    }
  );
 
  export const addOrder = createAsyncThunk(
    'orders/add',
    async (requestBody) => {
      try {
        const { data } = await axios.post("/api/products",{requestBody
        });
        return data;
      } catch (error) {
        return error.message;
      }
    }
  );


  const initialState = {
    loggedinorder: [],
    guestorder: [],
    neworder:[],
  };

export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserHistory.fulfilled,(state, action)=>{
              state.loggedinorder=action.payload
            })
            .addCase(fetchUserName.fulfilled,(state,action)=>{
                state.guestorder = action.payload
            })
            .addCase(addOrder.fulfilled,(state,action)=>{
              state.neworder=action.payload
            })
            
    },
});

export default orderSlice.reducer;
