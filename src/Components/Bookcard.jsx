import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from '../Features/cartSlice';
import { useNavigate } from 'react-router-dom';

const Bookcard = (data) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {cartItems} = useSelector((state)=> state.cart)
  let isPresent = cartItems.some(obj => {
    return obj.id === data.data.id
  });
const handleClick = ()=>{
  navigate(`/bookinfo/${data.data.id}`)
}

  return (
    <>
    <div className='bookcard' onClick={handleClick}>
        <img style={{position:'relative', top:'25px', left:'25px', height:'350px', width:'300px', borderRadius:'10px'}} src={data.data.img} alt={data.data.title} />
        <h4 className='bookcard-text'>{data.data.title}</h4>
        <p style={{position:'relative', top:'25px', left:'10px'}}> {data.data.author}</p>
        <h6 className='bookcard-text1'> ₹{data.data.price}</h6>
        <div></div>
        {/*
          !isPresent
           ?
        <button className='button' onClick={()=>{dispatch(addItem(data.data))}} style={{position:'absolute', bottom:'10px',  left:'115px', backgroundColor:'#2563EB', color:'whitesmoke'}}>Add to Cart</button>        
        :
        <button className='button' onClick={()=>{dispatch(removeItem(data.data.id))}} style={{position:'absolute', bottom:'10px', left:'85px', backgroundColor:'#2563EB', color:'whitesmoke'}}>Remove From Cart.</button>        
  */}
    </div>
    </>
  )
}

export default Bookcard
