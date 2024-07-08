import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { calculateTotals, calculateTotalQty, clearCart, closecart } from '../Features/cartSlice';
import { setOrder_id } from '../Features/authSlice';
import { json, useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
const Cart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {cartItems, total,  quantity, } = useSelector((state)=> state.cart)
    const {auth, name, email, order_id, contact, address} = useSelector((state)=> state.auth)

    useEffect(()=>{
      dispatch(calculateTotals())
      dispatch(calculateTotalQty())
    },[cartItems])

    const submitOrder = () => {
      if (address && contact) {
        const currorder = {
          email: email,
          name: name,
          items: cartItems,
          total: total,
          amount: quantity,
          address: address,
          contact: contact
        };
    
        fetch('https://u60lddpew4.execute-api.ap-south-1.amazonaws.com/production/placeorder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(currorder),
        })
        .then((response) => {
          if (!response.ok) {
            if (response.status === 440) {
              alert('Email id already Registered');
              navigate('/register');
            }
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((res) => {
          if (res.statusCode === 400) {
            alert("Could not place Order.");
          } else {
            console.log(res);
            dispatch(setOrder_id(JSON.parse(res.body)));
            console.log(order_id);
            alert("Order Placed Successfully!");
            navigate("/checkout");
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Error placing order. Please try again later.');
        });
      } else {
        alert("Update Address and Contact in Profile");
      }
    };
    

    
    return (
    <div className="cart-container">
      <button style={{position:'absolute', right:'70px', top:'15px', backgroundColor:'transparent', border:'none'}} onClick={()=>dispatch(closecart())}>
      <svg xmlns="http://www.w3.org/2000/svg" fill='black' height="26" width="26" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
    </button>
      <h2 style={{position:'absolute', left:'155px', fontSize:'3rem', top:'0px', marginTop:'0px', fontWeight:'500', color:"#1a1a1a"}}>Cart</h2>
      {cartItems.length>0
        ?<div style={{position:'absolute',display:'flex', left:'20px',color:'#1a1a1a',top:'60px',fontWeight:'700',gap:'200px'}}>
      <h3 style={{backgroundColor:'#f4db74', borderRadius:'50%', padding:'5px'}}>Total: ₹{total}</h3>
      <button style={{position:'relative',backgroundColor:'#f4db74', borderRadius:'50%', padding:'5px', color:'#1a1a1a',fontWeight:'700'}} onClick={()=>dispatch(clearCart())}>Clear</button>
      </div>:<></> }
      <div className="cart-content">
        {cartItems.length>0
        ?
        cartItems.map(item => (
          <CartItem key={item.key} data={item} />
        )):
        <p style={{position:'absolute', left:'135px', top:'70px', fontSize:'20px', color:'#1a1a1a'}}>Cart is Empty</p>
        
        }
        <div>
        </div>
        <button style={{position:'absolute',left:'170px',marginBottom:'10px', marginTop:'50px', backgroundColor:'#2563EB', color:'whitesmoke'}} onClick={()=>{if(cartItems.length > 0){submitOrder()}else{alert('Cart is Empty! \n Please add items to your cart!')}}}>Buy</button>
      </div>
    </div>
  );
};

export default Cart;
