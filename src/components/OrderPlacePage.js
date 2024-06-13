import React from 'react';
import ProductDetails from './ProductDetails.js';
import DeliveryAddress from './DeliveryAddress.js';
import OrderSummary from './OrderSummary.js';
import './css/OrderPlacePage.css'; // Assuming you have some basic CSS for styling

function OrderPlacePage() {
  return (
    <div className="app">
      <h1 className="header">meesho</h1>
      <div className="container">
        <ProductDetails />
        <DeliveryAddress />
        <OrderSummary />
      </div>
    </div>
  );
}

export default OrderPlacePage;
