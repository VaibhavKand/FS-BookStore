import React from 'react'

const CheckoutItem = (data) => {
  return (
    <>
    <div className='checkout-item'>
      <h4 style={{position:'relative', width:'500px',display:'flex', left:'10px',}}> {data.data.title}</h4>
      <h4 style={{position:'relative', width:'200px',display:'flex', left:'10px',}}> ₹{data.data.price}</h4>
      <h4 style={{position:'relative', width:'200px',display:'flex', left:'10px',}}> {data.data.quantity}</h4>
      <h4 style={{position:'relative', width:'200px',display:'flex', left:'10px',}}> ₹{data.data.tprice}</h4>
    </div>
    </>
  )
}

export default CheckoutItem
