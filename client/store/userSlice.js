import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllUser = createAsyncThunk('users/getAll', async () => {
    try {
      const { data } = await axios.get(`/api/users`);
      return data;
    } catch (error) {
      throw error
    }
  })

  export const getSingle = createAsyncThunk(
    'users/getSingle',
    async (userId) => {
      try {
        const { data } = await axios.get(`/api/users/${userId}`);
        return data;
      } catch (error) {
        return error.message;
      }
    }
  );

  export const addUser = createAsyncThunk(
    'users/addUser',
    async ({firstName, lastName, isAdmin,username,password }) => {
      try {
        const { data } = await axios.post("/api/users",{
            firstName, lastName, isAdmin,username,password 
        });
        return data;
      } catch (error) {
        return error.message;
      }
    }
  );

  export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (userId) => {
      try {
        const { data } = await axios.delete(`/api/users/${userId}`);
        return data;
      } catch (error) {
        throw error
      }
    }
  );

  export const updateUser = createAsyncThunk(
    'users/updateUser',
    async ({userId, firstName, lastName, username,password}) => {
      try {
        const {data} = await axios.put(`/api/users/${userId}`,{firstName, lastName, username,password})
        return data
      } catch(error){
        next (error)
       }
    }
  );


  const initialState = {
    allUsers: [],
    singleUser: {},
    status: 'idle',
  error: null,
  };

  export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(getAllUser.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.allUsers = action.payload;
        })
        .addCase(getSingle.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.singleUser = action.payload;
        })
        .addCase(addUser.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.singleUser = action.payload;
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.singleUser = action.payload;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.singleUser = action.payload;
        })
        
    },
  });
  

  
  export default userSlice.reducer;