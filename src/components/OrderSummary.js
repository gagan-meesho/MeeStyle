import React from 'react';
import './css/OrderSummary.css';

function OrderSummary() {
  return (
    <div className="order-summary">
      <h2>Price Details (1 Items)</h2>
      <div className="price-details">
        <p>
          <span>Total Product Price</span>
          <span>₹362</span>
        </p>
      </div>
      <h2>Order Total</h2>
      <button className="continue-button">Place Order</button>
      <div className="meessho-safe">
        <img src="meesho-safe-icon-url" alt="Meesho Safe" />
        <div>
          <strong>Your Safety, Our Priority</strong>
          <p>We make sure that your package is safe at every point of contact.</p>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
