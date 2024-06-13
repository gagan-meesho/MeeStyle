// src/ProductPage.js
import React from 'react';
import Navbar from './Navbar';
import './css/SupplierPage.css';
import {useState} from "react";

function SupplierPage() {
  const [prompt, setPrompt] = useState('');
  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleClick = async () => {
    
      
  };
  return (
    <div className="product-page">
<Navbar/>
     
      <div className="main-content">
        <div className="product-image">
          <img src="your-image-url.jpg" alt="Product" />
        </div>
        <div className="product-details">
          <h1>Meesho | Supplier Panel</h1>
          <p>₹315</p>
          <p>Free Delivery</p>
          <div className="select-size">
            <h2>Select Size</h2>
            <div className="size-options">
              <span className="size-option">Free Size</span>
            </div>
            <p className="no-size">No sizes available, try similar products</p>
          </div>
          <div className="product-info">
            <h2>Product Details</h2>
            <p>Name: Meesho | Supplier Panel</p>
            <p>Capacity: 250g</p>
            <p>Ideal For: Unisex</p>
            <p>Ingredients: Lavender</p>
            <p>Shelf life (Best Before): 24 Months</p>
            <p>Net Quantity (N): 1</p>
            <p>Country of Origin: India</p>
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
  );
}

export default SupplierPage;
