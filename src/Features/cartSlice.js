import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems:[],
    quantity:1,
    total:0,
    totalQty:0,
    cartOpen:false,
    isLoading: false,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        opencart:(state,action)=>{
            state.cartOpen = true
        },
        closecart:(state,action)=>{
            state.cartOpen = false
        },
        clearCart: (state, action)=>{
            state.cartItems = []
        },
        resetCart: (state, action)=>{
            state.cartItems = cartItems
        },
        addItem: (state, action)=>{
            const item = action.payload
            state.cartItems = [...state.cartItems, item]
        },
        removeItem: (state, action) =>{
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item)=> item.id !== itemId )
        },
        increase: (state, { payload }) =>{
            const cartItem = state.cartItems.find((item) => item.id === payload);
            cartItem.quantity = cartItem.quantity + 1;
            cartItem.tprice = cartItem.quantity*cartItem.price
        },
        decrease: (state, {payload}) =>{
            const cartItem = state.cartItems.find((item) => item.id === payload);
            cartItem.quantity = cartItem.quantity - 1;
            cartItem.tprice = cartItem.quantity*cartItem.price
        },
        calculateTotalQty:(state, {payload})=>{
            let totalqty = 0
            state.cartItems.forEach((item) => {
                totalqty += item.quantity
            })
            state.totalQty = totalqty
        },
        calculateTotals: (state, {payload}) =>{
            let amount = 0
            let total = 0
            state.cartItems.forEach((item) => {
                amount += item.quantity
                total += item.quantity * item.price
            })
            state.quantity = amount
            state.total = total;
        }
    }
})

export const {clearCart, addItem, removeItem, increase, decrease, calculateTotalQty, calculateTotals, resetCart, opencart, closecart} = cartSlice.actions
export default cartSlice.reducer