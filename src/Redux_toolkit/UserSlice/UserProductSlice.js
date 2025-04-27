import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const base_url = "http://localhost:5000"

export const getallproduct = createAsyncThunk(
  'product/getallproduct',
  async ( { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
  
        const response = await axios.get(`${base_url}/api/getproduct`, {
          headers: {
            Authorization: `Bearer ${token}`, // Use "Bearer" before the token
          },
          withCredentials: true // optional, only needed if your backend reads cookies
        });
        console.log('called api')
        return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const getproductslice = createSlice({
  name: 'getproduct',
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
      .addCase(getallproduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getallproduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload.data;
      })
      .addCase(getallproduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetProductState } = getproductslice.actions;
export default getproductslice.reducer;