// src/Redux_toolkit/categorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const base_url = 'https://deshbd-backend.onrender.com';
// Async action to create category
export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (formData, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.post(`${base_url}/api/createcategory`, formData, {
          headers: {
            Authorization: `Bearer ${token}`, // Use "Bearer" before the token
          },
          withCredentials: true // optional, only needed if your backend reads cookies
        });
  
        return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);
export const getcategory = createAsyncThunk(
    'category/getcategory',
    async (formData, { rejectWithValue }) => {
      try {
          const token = localStorage.getItem('token');
  
          const response = await axios.get(`${base_url}/api/getcategory`, {
            headers: {
              Authorization: `Bearer ${token}`, // Use "Bearer" before the token
            },
            withCredentials: true // optional, only needed if your backend reads cookies
          });
    
          return response.data.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Something went wrong");
      }
    }
  );

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    loading: false,
    error: null,
    success: false,
    category: null,
  },
  reducers: {
    resetCategoryState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.category = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.category = action.payload;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      builder
      .addCase(getcategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.category = action.payload;
      })
      .addCase(getcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });  
  }
});

export const { resetCategoryState } = categorySlice.actions;
export default categorySlice.reducer;
