import React from 'react';
import './css/OrderSummary.css';
import { useNavigate } from 'react-router-dom';

function OrderSummary({customInstructions}) {


  const navigate = useNavigate();
  
  return (
   
      <div className="paragraph-container">
        <h4>Custom Instructions</h4>
        <p>{customInstructions}</p>
      </div>
    
  );
}

export default OrderSummary;
