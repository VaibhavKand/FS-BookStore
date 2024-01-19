import React, { useState, useEffect } from 'react';
import Bookcard from './Bookcard';
import { useDispatch,useSelector } from 'react-redux'
import { data } from "../data"
const Bookshelf = () => {
  const {auth, name} = useSelector((state)=> state.auth)
  return (
    <div>
      <div className='name-container'>
      {auth ?
        <div className='name'>Hello {name}</div>
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
