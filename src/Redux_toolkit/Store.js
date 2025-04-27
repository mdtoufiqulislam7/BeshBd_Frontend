import { configureStore } from "@reduxjs/toolkit";
import userReducer from './User.Slice';
import addressReducer from './Address.slice';
import cetegoryRegucer from './Cetegory.slice';
import subcetegoryReducer from './subCategorySlice';
import productReducer from "./productSlice";
import cartReducer from './cart'

export const store = configureStore({
  reducer: {
    user: userReducer,
    address: addressReducer,
    category: cetegoryRegucer,
    subCategory: subcetegoryReducer,
    product: productReducer,
    cart:cartReducer
  }
});

export default store;
