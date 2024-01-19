import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Features/cartSlice"
import modalReducer from "./Features/modalSlice"
import authReducer from "./Features/authSlice" 
export const store = configureStore({
    reducer: {
        cart:cartReducer,
        modal:modalReducer,
        auth:authReducer,
    }
})