import React from 'react';
import './css/ProductDetails.css';

function ProductDetails() {
  return (
    <div className="product-details">
      <h2>Product Details</h2>
      <div className="estimated-delivery">
        Estimated Delivery by Saturday, 16th J  un
      </div>
      <div className="product-info">
        <img src="your-image-url.jpg" alt="Product" className="product-image" />
        <div className="product-description">
          <p>Myra Petite Women Kurta Sets</p>
          <p>₹362</p>
          <p>All issue easy returns</p>
          <p>Size: M ・ Qty: 1</p>
        </div>
        <button className="edit-button">EDIT</button>
      </div>
      <p>Sold by: ORRA ENTERPRISE<span>Free Delivery</span></p>
    </div>
  );
}

export default ProductDetails;
