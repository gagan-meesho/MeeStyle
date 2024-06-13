import React from 'react';
import './css/DeliveryAddress.css';

function DeliveryAddress() {
  return (
    <div className="delivery-address">
      <h2>Delivery Address</h2>
      <p className="address-info">
        Aaryanaditya Singh <br />
        feb 30 marigold PG, Green glen layout, Bellandur, Bengaluru, Karnataka - 560103 <br />
        6309558710
      </p>
      <button className="change-button">CHANGE</button>
    </div>
  );
}

export default DeliveryAddress;
