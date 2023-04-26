import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchCartItems = createAsyncThunk(
  "cart/fetchItems",
  async (userId) => {
    const { data } = await axios.get(`/api/cart/${userId}`);
    return data;
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItem",
  async ({ userId, productId,quantity }) => {
    const { data } = await axios.post(`/api/cart/${userId}/add`, { productId,quantity });
    return data;
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateItemQuantity",
  async ({ userId, productId, quantity }) => {
    const { data } = await axios.put(`/api/cart/${userId}/update`, {
      productId,
      quantity,
    });
    return data;
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItem",
  async ({ userId, productId }) => {
    await axios.delete(`/api/cart/${userId}/remove`, { data: { productId } });
    return productId;
  }
);

export const deleteAllFromCart=createAsyncThunk("cart/deleteall",
async(userId)=>{
  await axios.delete(`api/cart/${userId}`)
}
)


const initialState = {
    isCartOpen: false,
    cart:[],
  };
  export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      setIsCartOpen: (state) => {
        state.isCartOpen = !state.isCartOpen;
      },
    },
    extraReducers: (builder)=>{
      builder.addCase(fetchCartItems.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
      builder.addCase(addItemToCart.fulfilled, (state, action) => {
        state.cart.push(action.payload);
      });
      builder.addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        const index = state.cart.findIndex(
          (item) => item.product.id === action.payload.productId
        );
        if (index !== -1) {
          state.cart[index].quantity = action.payload.quantity;
        }
      });
        // state.singleitem = action.payload;

      builder.addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.cart = state.cart.filter((item) => item.productId !== action.payload);
      });

      builder.addCase(deleteAllFromCart.fulfilled,(state,action)=>{
         state.cart=[]
      })
    },
  });
  
  export const {
    setIsCartOpen,
  } = cartSlice.actions;
  
  export default cartSlice.reducer;