import {createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: false,
    name:'',
    email:'',
    order_id :''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setMail: (state, {payload})=>{
            console.log("payload",payload)
            state.email = payload
        },
        resetMail: (state, {payload})=>{
            state.email = ''
        },
        setName: (state, {payload})=>{
            state.name = payload
        },
        resetName: (state, {payload})=>{
            state.name = ''
        },
        setAuth: (state, {payload})=>{
            state.auth = true
        },
        resetAuth: (state, {payload})=>{
            state.auth = false
        },
        setOrder_id: (state, {payload})=>{
            state.order_id = payload
        },
        resetOrder_id: (state, {payload})=>{
            state.order_id = ''
        }, 
    }
})
export const {setName, setAuth, resetName, resetAuth, setMail, resetMail, setOrder_id, resetOrder_id} = authSlice.actions
export default authSlice.reducer