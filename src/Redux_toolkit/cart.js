// src/Redux_toolkit/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const base_url = 'https://deshbd-backend.onrender.com'; // Update if your backend URL is different

// ✅ Add to cart POST
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${base_url}/api/addtocart`, { productId }, {
        headers: {
          Authorization: `Bearer ${token}`, // Use "Bearer" before the token
        },
        withCredentials: true, // optional, only needed if your backend reads cookies
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ✅ Get user cart GET
export const getUserCart = createAsyncThunk(
  'cart/getUserCart',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${base_url}/api/getcardproduct`, {
        headers: {
          Authorization: `Bearer ${token}`, // Use "Bearer" before the token
        },
        withCredentials: true, // optional, only needed if your backend reads cookies
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteFromCart = createAsyncThunk(
    'cart/deleteFromCart',
    async (cartItemId, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${base_url}/api/deleteCart`, {
          data: { cartItemId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

  
        return cartItemId; // Return the ID of the deleted item
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );

// ✅ Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [], // Start with an empty array
    cartCount: 0,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearCartState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    setCartCount: (state, action) => {
        state.cartCount = action.payload;
      }
  },
  extraReducers: (builder) => {
    builder
      // ➡️ Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.cartItems.push(action.payload); // Add the new item to the cart
        state.cartCount = state.cartItems.length; // Update cart count
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ➡️ Get user cart
      .addCase(getUserCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.cartItems = action.payload;
        state.cartCount = action.payload.length; // Update cart count
        localStorage.setItem('cartCount', state.cartCount);
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload
        ); // Remove the item from the cart list
        state.cartCount = state.cartItems.length; // Update cart count
      })
      .addCase(deleteFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });  
  },
});

export const { clearCartState ,setCartCount } = cartSlice.actions;
export default cartSlice.reducer;
