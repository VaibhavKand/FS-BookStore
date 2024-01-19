import React from 'react'
import { useDispatch } from 'react-redux';
import { increase, decrease, removeItem } from '../Features/cartSlice';
const CartItem = (data) => {
    const dispatch = useDispatch()

  return (
    <div className='cart-item'>
        <img className='cart-img' src={data.data.img} />
        <h4 style={{position:'relative', top:'20px'}}>Title: {data.data.title}</h4>
        <h6 style={{position:'relative', top:'20px'}}>Price: ₹{data.data.price}</h6>
        <div style={{position:'relative', top:'30px', width:'100px', display:'flex', left:'125px' ,backgroundColor:'gray'}}>
        <button onClick={()=>{if(data.data.quantity === 1){dispatch(removeItem((data.data.id)));return;}dispatch(decrease(data.data.id))}} className='amount-btn'>-</button>
        <span style={{position:'relative',marginLeft:'15px', marginRight:'15px', fontWeight:'bold'}}>{data.data.quantity}</span>
        <button onClick={()=>dispatch(increase(data.data.id))} className='amount-btn'>+</button>
        </div>
        {<button onClick={()=>{dispatch(removeItem(data.data.id))}} style={{position:'absolute', bottom:'0px', width:'180px', left:'80px', backgroundColor:'#2563eb', color:'#f8f9fa', borderRadius:'1.5rem'}}>Remove From Cart.</button>}
    </div>
  )
}

export default CartItem
