import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = "https://deshbd-backend.onrender.com";


export const updateAddress = createAsyncThunk(
    'address/updateaddress',
    async (userData, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem('token');
  
        const response = await axios.post(`${base_url}/api/address/postaddress`, userData, {
          headers: {
            Authorization: `Bearer ${token}`, // Use "Bearer" before the token
          },
          withCredentials: true // optional, only needed if your backend reads cookies
        });
  
        return response.data.data; // Return the updated data
      } catch (error) {
        // Catch the error and return it in rejected payload
        return rejectWithValue(error.response?.data?.message || 'Update failed');
      }
    }
  );
export const updateUserAddress = createAsyncThunk(
    'address/updateuseraddress',
  async (userData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.put(`${base_url}/api/address/updateaddress`, userData, {
        headers: {
          Authorization: `Bearer ${token}`, // Use "Bearer" before the token
        },
        withCredentials: true // optional, only needed if your backend reads cookies
      });

      return response.data.data; // Return the updated data
    } catch (error) {
      // Catch the error and return it in rejected payload
      return rejectWithValue(error.response?.data?.message || 'Update failed');
    }
  }
)

// Slice
const userSlice = createSlice({
  name: "address",
  initialState: {
    address: null,
    loading: false,
    error: null,
   
  },
  reducers: {
   
  },
  extraReducers: (builder) => {
    // createuser address
    builder
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.address = action.payload;
        
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    //updateuserAddress  
    builder 
      .addCase(updateUserAddress.pending,(state)=>{
        state.loading = true;
        state.error= null;
      })
      .addCase(updateUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.address = action.payload;
        
      })
      .addCase(updateUserAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
