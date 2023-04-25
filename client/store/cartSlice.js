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
  async ({ userId, productId, newQuantity }) => {
    const { data } = await axios.put(`/api/cart/${userId}/update`, {
      productId,
      newQuantity,
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



const initialState = {
    isCartOpen: false,
    cart: [],
    items:[],
    singleitem:{}
  };

  export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      setItems: (state, action) => {
        state.cart = action.payload;
      },
  
      addToCart: (state, action) => {
        state.cart = [...state.cart, action.payload.item];
      },
  
      removeFromCart: (state, action) => {
        state.cart = state.items.filter((item) => item.id !== action.payload.id);
      },
  
      increaseCount: (state, action) => {
        state.cart = state.cart.map((item) => {
          if (item.id === action.payload.id) {
            item.count++;
          }
          return item;
        });
      },
  
      decreaseCount: (state, action) => {
        const { id } = action.payload;
        const cartItem = state.cart.find((item) => item.id === id);

        if (cartItem.count === 1) {
          state.cart = state.cart.filter((item) => item.id !== id);
        } else {
          state.cart = state.cart.map((item) => {
                if (item.id === id) {
                    item.count--;
                }
                return item;
            });
        }
    },
  
      setIsCartOpen: (state) => {
        state.isCartOpen = !state.isCartOpen;
      },
    },
    extraReducers: (builder)=>{
      builder.addCase(fetchCartItems.fulfilled, (state, action) => {
        state.cart= action.payload;
      });
      builder.addCase(addItemToCart.fulfilled, (state, action) => {
        state.cart.push(action.payload);
      });
      builder.addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        // const index = state.cart.findIndex(
        //   (item) => item.product.id === action.payload.productId
        // );
        // if (index !== -1) {
        //   state[index].cart.quantity = action.payload.quantity;
        // }
        state.singleitem = action.payload;
      });
      builder.addCase(removeItemFromCart.fulfilled, (state, action) => {
        // return state.cart.filter((item) => item.productId !== action.payload);
        state.singleitem = action.payload;
      });
    },
  });
  
  export const {
    setItems,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    setIsCartOpen,
  } = cartSlice.actions;
  
  export default cartSlice.reducer;