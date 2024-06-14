import React from 'react';
import ProductDetails from './ProductDetails.js';
import DeliveryAddress from './DeliveryAddress.js';
import OrderSummary from './OrderSummary.js';
import './css/OrderPlacePage.css'; // Assuming you have some basic CSS for styling
import { useLocation } from 'react-router-dom';

function OrderPlacePage() {
  const location=useLocation()
  const { size, material, quantity, logo, customInstructions,image } = location.state || {};
  console.log(size)
  return (
    <div className="app">
      <h1 className="header">meesho</h1>
      <div className="container">
        <ProductDetails size={size} material={material} quantity={quantity} image={image}  logo={logo} customInstructions={customInstructions} />
        <DeliveryAddress />
        <OrderSummary customInstructions={customInstructions}size={size} material={material} quantity={quantity} image={image}/>
      </div>
    </div>
  );
}

export default OrderPlacePage;
