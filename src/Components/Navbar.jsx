import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetAuth } from '../Features/authSlice'
import { useLocation } from 'react-router-dom';
import { opencart, closecart, clearCart} from '../Features/cartSlice';
import { resetContact, resetImage, resetMail, resetName, resetOrder_id, resetAddress } from '../Features/authSlice';
import Cart from './Cart'
const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {cartOpen} = useSelector((state)=> state.cart)
    const {auth} = useSelector((state)=> state.auth)
    const dispatch = useDispatch()
    
    const isCheckoutRoute = location.pathname.startsWith('/checkout');
    const isLoginRoute = location.pathname === ('/');
    const isRegisterRoute = location.pathname.startsWith('/register');
    const isBookStoreRoute = location.pathname.startsWith('/bookstore');
    const isPasswordResetRoute = location.pathname.startsWith('/password_reset')
    const isUpdatePasswordRoute = location.pathname.startsWith ('/new_password/');
    
    const handleLogout = () =>{
      dispatch(resetAddress())
      dispatch(resetContact())
      dispatch(resetName())
      dispatch(resetOrder_id())
      dispatch(resetAuth())
      dispatch(resetMail())
      dispatch(resetImage())
      navigate('/')
    }

    const handlebackClick = ()=>{
      navigate('/bookstore')
    }
  return (
    <>
    <button style={isCheckoutRoute? {position:'absolute', right:'50px', backgroundColor:'#2563eb', color:'#ffffff'}: {display:'none'}} onClick={handleLogout}>Logout</button>
    <div className='navbar' style={isLoginRoute || isCheckoutRoute || isRegisterRoute || isPasswordResetRoute || isUpdatePasswordRoute ? {display:'none'}: {display:'flex'}}>
    <button style={isBookStoreRoute || isCheckoutRoute || isLoginRoute || isRegisterRoute || isPasswordResetRoute || isUpdatePasswordRoute ? {display:'none'}: {position:'absolute', left:'0px', top:'20px', backgroundColor:'transparent', border:'none'}} onClick={handlebackClick}>
    <svg xmlns="http://www.w3.org/2000/svg" fill='white' height="26" width="26" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
    </button>
    <div className='title' onClick={()=>{navigate('/bookstore')}}>BookStore</div>
    {!cartOpen ? <div className='links1' onClick={()=>{dispatch(resetAuth()),dispatch(clearCart()),navigate('/')}}>Logout</div>:<></> }
    <div className="cart-icon" onClick={()=>dispatch(opencart())}>
    {!isCheckoutRoute && !cartOpen? <><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 12.34a2 2 0 0 0 1.92 1.46h9.8a2 2 0 0 0 1.92-1.46L23 6H6" /></svg>
    </>:<></>}</div>
    { cartOpen && <Cart />} 
    </div>
    </>
  )
}

export default Navbar
