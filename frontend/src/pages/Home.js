import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
  const [loggedInUser,setLoggedInUser]= useState('');
  const [products,setProducts]= useState('');
  const navigate =useNavigate();
  useEffect(()=>{
   setLoggedInUser(localStorage.getItem('loggedInUser'));
  },[])
  const handleLogout = (e) => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('loggedInUser');
    handleSuccess('Logout successful');
    setTimeout(()=>{
      navigate('/login');
    },1000)
  }
  //create a product resource if we want to show data making by call /api
  const fetchProducts = async () =>{
    try{
      const url ="http://localhost:8080/products";
      const headers = {
        headers:{
          'Authorization':localStorage.getItem('jwtToken')
        }
      }
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
     setProducts(result);
    }catch(err){
      handleError(err);

    }
  }
  useEffect(()=>{
    fetchProducts()
  },[])
  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {
          products && products?.map((item,index)=>(
          <ul key={index}>
            <span>
              {item.name} : {item.price}
            </span>
          </ul>
          ))
        }
      </div>
      <ToastContainer/> 
    </div>
    //define toast container for displaying notifications
  )
}

export default Home