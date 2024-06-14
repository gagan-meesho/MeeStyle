import React from 'react';
import './css/ProductDetails.css';
import { useNavigate } from 'react-router-dom';

function ProductDetails({size,material,image,quantity,logo,customInstructions}) {
  const navigate=useNavigate();
  const handleClick=()=>{
  navigate('/supplier-page', {
    state: { size, material, quantity, logo, customInstructions,image },
  });
}
  return (
    <div className="product-details">
      <h2>Product Details</h2>
      <div className="estimated-delivery">
        Estimated Delivery by Saturday, 16th J  un
      </div>
      <div className="product-info">
        <img src={image} alt="Product" className="product-image" />
        <div className="product-description">
          <p>Your Custom Product</p>
          
          <p>Material: {material}</p>
          <p>Size: {size} ・ Qty: {quantity}</p>
        </div>
       
        <button type="submit"className="edit-button" onClick={handleClick}>Place order request</button>
      </div>
      <p>Sold by: ORRA ENTERPRISE<span>Free Delivery</span></p>
    </div>
  );
}

export default ProductDetails;
