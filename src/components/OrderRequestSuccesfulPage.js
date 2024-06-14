import React from 'react';
import './css/OrderRequestSuccesfulPage.css';
import Navbar from './Navbar'

const OrderPlaced = () => {
  return (
    <>
    <Navbar/>
    <div className="order-placed-container">
      <div className="order-placed-content">
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your purchase. Your order has been placed and will be processed shortly.</p>
        <div className="order-summary">
          <h3>Order Summary</h3>
          <p><strong>Order Number:</strong> #123456789</p>
          <p><strong>Estimated Delivery:</strong> Saturday, 16th Jun</p>
          <p><strong>Delivery Address:</strong></p>
          <p>Aaryanaditya Singh <br />
             Feb 30 Marigold PG, Green Glen Layout, Bellandur, Bengaluru, Karnataka - 560103</p>
        </div>
        <button className="continue-shopping-button">Continue Shopping</button>
      </div>
    </div>
    </>
  );
};

export default OrderPlaced;
