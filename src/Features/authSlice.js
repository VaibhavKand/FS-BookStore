import {createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: false,
    name:'',
    email:'',
    order_id :'',
    image:'https://fs-book-store.s3.ap-south-1.amazonaws.com/IMG-20240308-WA0038.jpg',
    address:'', 
    contact:''
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
        setAddress: (state, {payload})=>{
            state.address = payload
        },
        resetAddress: (state, {payload})=>{
            state.address = ''
        },
        setImage: (state, {payload})=>{
            state.image = payload
        },
        resetImage: (state, {payload})=>{
            state.image = ''
        },
        setContact: (state, {payload})=>{
            state.contact = payload
        },
        resetContact: (state, {payload})=>{
            state.contact = ''
        },
    }
})
export const {setName, setAuth, resetName, resetAuth, setMail, resetMail, setOrder_id, resetOrder_id, setAddress, setImage, setContact, resetAddress, resetContact, resetImage} = authSlice.actions
export default authSlice.reducer