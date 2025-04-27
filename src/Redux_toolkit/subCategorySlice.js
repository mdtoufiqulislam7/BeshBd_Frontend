import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const base_url = 'https://deshbd-backend.onrender.com';

// ✅ CREATE SubCategory
export const createSubCategory = createAsyncThunk(
  'subCategory/create',
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        `${base_url}/api/createSubCategory`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to create subcategory'
      );
    }
  }
);

// ✅ GET SubCategory By Category ID
export const getSubCategoryByCategoryId = createAsyncThunk(
  'subCategory/getByCategoryId',
  async (categoryId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(
        `${base_url}/api/getsubcategory/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch subcategories'
      );
    }
  }
);

const subCategorySlice = createSlice({
  name: 'subCategory',
  initialState: {
    loading: false,
    error: null,
    success: false,
    list: [],      // All fetched subcategories
    created: null, // Most recently created subcategory
  },
  reducers: {
    resetSubCategoryState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.created = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.created = action.payload;
      })
      .addCase(createSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch by category ID
      .addCase(getSubCategoryByCategoryId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubCategoryByCategoryId.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.list = action.payload;
      })
      .addCase(getSubCategoryByCategoryId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSubCategoryState } = subCategorySlice.actions;
export default subCategorySlice.reducer;
