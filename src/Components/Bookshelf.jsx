import React, { useState, useEffect } from 'react';
import Bookcard from './Bookcard';
import { useDispatch,useSelector } from 'react-redux'
import { data } from "../data"
import { useNavigate } from 'react-router-dom';
const Bookshelf = () => {
  
  const navigate = useNavigate();
  const handleSubmit = () =>{
    navigate('/profile')
  }
  const {auth, name} = useSelector((state)=> state.auth)
  useEffect(() => {
    if (!auth){
      navigate('/')
    }
  },[]);
  return (
    <div>
      <div className='name-container'>
      {auth ?
        <div className='name'><button style={{position:'relative',display:'flex',backgroundColor:'transparent', marginBottom:'50px', color:'white', cursor:"pointer", }} onClick={handleSubmit} >Hello {name}</button></div>
          : 
        <div className='name'>Welcome</div>  
    }</div>
    <div className='bookshelf'>
      {data.length > 0 && data.map(item => (
        <Bookcard key={item.key} data={item} />
      ))}
    </div>
  </div>
  );
};

export default Bookshelf;
