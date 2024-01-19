import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, opencart, closecart } from './Features/cartSlice';
import { useNavigate } from 'react-router-dom';
import { data } from './data'

const Bookinfo = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const [book, setBook] = useState({})
    const {cartItems, cartOpen} = useSelector((state)=> state.cart)
    let isPresent = cartItems.some(obj => {
        return obj.id === book.id
  });
    useEffect(()=>{
        for(let i = 0; i < data.length; i++ ){
            if(String(data[i].id) === id){
                setBook(data[i])
                break;
            }
        }
    },[])

    return (
            <div className='book-info-container-outer'>
            <div className='book-info-container'>
                <div >
                <img className='book-info-image' src={book.img} alt="" />
                </div>
            <div className='book-info-details'>   
            <h1 className='book-info-title'>{book.title}</h1>
            <h2 className='book-info-author'>{book.author}</h2>
            <h1></h1>
            <p className='book-info-description'>{book.description}</p>
            <h6 className='book-info-price'> ₹{book.price}</h6>
            {
            !isPresent
            ?
            <button className='button' onClick={()=>{dispatch(addItem((book))); dispatch(closecart())}} style={{position:'absolute', bottom:'55px',  left:'5px', backgroundColor:'#2563EB', color:'whitesmoke'}}>Add to Cart</button>        
            :
            <button className='button' onClick={()=>{dispatch(removeItem(book.id))}} style={{position:'absolute', bottom:'55px', left:'5px', backgroundColor:'#2563EB', color:'whitesmoke'}}>Remove From Cart.</button>        
            }
            </div>
            </div>    
        </div>
    )
}

export default Bookinfo
