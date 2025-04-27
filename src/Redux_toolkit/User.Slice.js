import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = 'https://deshbd-backend.onrender.com';

// Thunk: User Login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}/api/user/login`, formData, {
        withCredentials: true,
      });
      console.log(response.data.data)
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || "Login failed");
    }
  }
);

// Thunk: User Registration
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}/api/user/registation`, formData, {
        withCredentials: true,
      });

      // ✅ Ensure the shape matches expected: { user: {...}, success: true }
      return {
        user: response.data.data,
        success: true,
      };

    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Registration failed");
    }
  }
);

export const getuserinfo = createAsyncThunk('user/userinformation', async (_, { rejectWithValue }) => {
  const token = localStorage.getItem('token'); // You already saved this after login
  try {
    const response = await axios.get(`${base_url}/api/user/userdetails`, {
      headers: {
        Authorization: `Bearer ${token}`, // Use "Bearer" before the token
      },
      withCredentials: true // optional, only needed if your backend reads cookies
    });

    return response.data.data;

  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
  }
});

export const uploadprofileimage = createAsyncThunk(
  'user/uploadprofileimage',
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('image', file); // field name in your backend

      const token = localStorage.getItem('token');
      const response = await axios.put(`${base_url}/api/user/upload-profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Use "Bearer" before the token
        },
        withCredentials: true // optional, only needed if your backend reads cookies
      });

      return response.data; // Return the response if successful
    } catch (error) {
      // If error occurs, return it as the rejected action payload
      return rejectWithValue(error.response?.data?.message || 'Upload failed');
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  'user/updateUserDetails',
  async (userData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.put(`${base_url}/api/user/update-user`, userData, {
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

export const verifyemail = createAsyncThunk(
  "user/verifyemail",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}/api/user/verify-email`, formData, {
        withCredentials: true,
      });

      // ✅ Ensure "success" is part of payload
      return {
        success: response.data.success, // backend should return this
        message: response.data.message || "Verified successfully",
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Email verification failed");
    }
  }
);

// Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
   
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("auth");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken
        localStorage.setItem('token', JSON.stringify(action.payload.accessToken));
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //verifyemail  
    builder
    .addCase(verifyemail.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(verifyemail.fulfilled, (state) => {
      state.loading = false;
      state.user = null; // Clear any existing user info
      localStorage.removeItem("user");
    })
    .addCase(verifyemail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });  
    builder
    // getuserinfo  
      .addCase(getuserinfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getuserinfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        
      })
      .addCase(getuserinfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });  
      builder
      // uploadprofileimage
      .addCase(uploadprofileimage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadprofileimage.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (state.user) {
          state.user.avater = action.payload.profilePicture;
        }
        
      })
      .addCase(uploadprofileimage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      }); 
      builder

      // updateUserDetails
      .addCase(updateUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = {
          ...state.user,
          ...action.payload,
        };
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Update failed';
      }); 
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
