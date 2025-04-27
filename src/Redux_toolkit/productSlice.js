import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const base_url = 'https://deshbd-backend.onrender.com';

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (formData, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
  
        const response = await axios.post(`${base_url}/api/createProduct`,formData, {
          headers: {
            Authorization: `Bearer ${token}`, // Use "Bearer" before the token
          },
          withCredentials: true // optional, only needed if your backend reads cookies
        });
  
        return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getallproduct = createAsyncThunk(
  'product/getallproduct',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${base_url}/api/getproduct`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      return response.data; // Return full response including message & data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const getProductByCategory = createAsyncThunk(
  'product/getProductByCategory',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${base_url}/api/getproduct/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
const productSlice = createSlice({
  name: 'product',
  initialState: {
    loading: false,
    error: null,
    success: false,
    data: null,
  },
  reducers: {
    resetProductState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload.data;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
      builder
      .addCase(getallproduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getallproduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(getallproduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      }); 
    builder
      .addCase(getProductByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getProductByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(getProductByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });   
  },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;