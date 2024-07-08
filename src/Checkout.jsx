import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckoutItem from './Components/CheckoutItem'
import { clearCart,} from './Features/cartSlice'
import { resetAuth } from './Features/authSlice'
const Checkout = () => {
    const {cartItems, total, totalQty} = useSelector((state)=> state.cart)
    const {order_id} = useSelector((state)=> state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const getReceipt = (order_id) =>{
      const receipt = {order_id:(order_id)}
      fetch('https://u60lddpew4.execute-api.ap-south-1.amazonaws.com/production/fetchreceipt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(receipt)
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data.body)
        const blob = new Blob([data.body]);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'receipt.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    }
  return (
    <div className='register-bg'>
      <div className='amogh' style={{display:'flex', width:'1000px', height:'100vh', color:'#1a1a1a'}}>
      <h1 style={{position:'absolute', left:'24.8vw', top:'50px', fontWeight:'700',fontSize:'55px',fontFamily:'Plastic Love' ,}} >Thank You For Shopping With Us!</h1>
      <div style={{display:'flex', position:'absolute', left:'250px', top:'200px', }}>
      <h4 style={{position:'relative', width:'370px',display:'flex', left:'110px', fontSize:'25px', fontWeight:'500'}}> Title</h4>
      <h4 style={{position:'relative', width:'130px',display:'flex', left:'110px',fontSize:'25px', fontWeight:'500'}}> Price</h4>
      <h4 style={{position:'relative', width:'150px',display:'flex', left:'110px',fontSize:'25px', fontWeight:'500'}}> Quantity</h4>
      <h4 style={{position:'relative', width:'200px',display:'flex', left:'110px',fontSize:'25px', fontWeight:'500'}}> Amount</h4>
      </div>
      <div className='checkout-list-container'>
      <div className='checkout-list' >
        {
       cartItems.map(item => (
        <CheckoutItem key={item.id} data={item} />
      ))
        }
      <div style={{display:'flex', position:'relative', borderTop:'2px solid darkgray'}} >
      <h4 style={{position:'relative', width:'705px',display:'flex', left:'10px',fontSize:'25px', fontWeight:'500'}}> Total:</h4>
      <h4 style={{position:'relative', width:'200px',display:'flex', left:'10px',fontSize:'25px', fontWeight:'500'}}> {totalQty}</h4>
      <h4 style={{position:'relative', width:'200px',display:'flex', left:'10px',fontSize:'25px', fontWeight:'500'}}> ₹{total}</h4>
      </div>
    </div>
    <div style={{marginBottom:'100px', marginTop:'20px'}}>
        <button style={{position:'absolute',left:'0px',backgroundColor:'#2563EB', color:'whitesmoke'}} onClick={()=>{dispatch(clearCart());navigate('/bookstore')}}>Continue Shopping?</button>
        <button style={{position:'absolute',right:'0px',backgroundColor:'#2563EB', color:'whitesmoke'}} onClick={()=>getReceipt(order_id)} >Download Receipt</button>
    </div>
    </div>
    <button style={{position:'absolute', bottom:'50px', left:'740px', backgroundColor:'#2563eb', color:'#fff'}} onClick={()=>{dispatch(resetAuth()),dispatch(clearCart()),navigate('/')}}>Logout</button>
    </div>
    </div>
  )
}

export default Checkout
