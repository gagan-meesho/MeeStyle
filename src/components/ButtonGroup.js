import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {Link} from "react-router-dom";

const ButtonGroup = ({onClose, data}) => {
  return (
      <>
      <button className="close-button" onClick={onClose}>
        <span>&times;</span>
      </button>
  <div className="button-group">
    <button className="button add-to-cart">
          <i className="fas fa-shopping-cart"></i> Add to Cart
        </button>
    <Link to={`/instruction-place?image=${data}`}>

      <button className="button buy-now">
        <i className="fas fa-bolt"></i> Buy Now
      </button>
    </Link>


  </div>
      </>
  );
};

export default ButtonGroup;
