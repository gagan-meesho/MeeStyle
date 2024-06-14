// src/ProductPage.js
import React from 'react';
import Navbar from './Navbar';
import './css/SupplierPage.css';
import {useState} from "react";
import { useLocation } from 'react-router-dom';

function SupplierPage() {
  const location=useLocation()
  const { size, material, quantity, logo, customInstructions,image } = location.state || {};
  const [prompt, setPrompt] = useState('');
  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleClick = async () => {
    
      
  };
  return (<>
    <Navbar/>
    <div className="product-page">

     
      <div className="main-content">
        <div className="product-image">
          <img src={image} alt="Product" />
        </div>
        <div className="product-details">
          <h1>Meesho | Supplier Panel</h1>
         
          <p>Free Delivery</p>
          <div className="select-size">
            <h2>Size: {size}</h2>
            <h2>Material: {material}</h2>
            <h2>Quantity: {quantity}</h2>
            <h2>Country of Origin: India</h2>
            <h2>Ideal for Unisex</h2>
          
          </div>
          
          <div className="bid">
           
            <input
              type="text"
              value={prompt}
              onChange={handleInputChange}
              style={{flexGrow: 1, marginRight: '10px'}}
              placeholder="Enter your bid..."

          />
          <button onClick={handleClick}>Send</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default SupplierPage;
