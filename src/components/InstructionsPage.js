// src/LandingPage.js
import React, { useState } from 'react';
import Navbar from './Navbar';
import './css/InstructionPage.css';
import { useLocation } from 'react-router-dom';


function LandingPage() {
    const location = useLocation();
  const { image } = location.state;
  console.log(image)
  const [size, setSize] = useState('');
  const [material, setMaterial] = useState('');
  const [quantity, setQuantity] = useState('');
  const [customInstructions,setCustomInstructions]=useState('')
  const [logo, setLogo] = useState(null);

  const handleLogoUpload = (event) => {
    setLogo(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    console.log({ size, material, quantity, logo });
  };

  return (
    <>
    <Navbar/>
    <div className="landing-page">
    <img
                              src={`data:image/png;base64,${image}`}
                              className='generated-image'
                             
                          />
      <h1>Product Customization</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="size">Size</label>
          <input
            type="text"
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="material">Material</label>
          <input
            type="text"
            id="material"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          
        </div>
        <div className="form-group">
          <label htmlFor="material">Custom Instructions</label>
          <textarea
            type="text"
            id="material"
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
          />
          </div>
        <div className="form-group">
          <label htmlFor="logo">Upload Logo</label>
          <input type="file" id="logo" onChange={handleLogoUpload} />
          {logo && <img src={logo} alt="Uploaded Logo" className="logo-preview" />}
        </div>
        <button type="submit" onClick={()=>{navigate}}>Submit</button>
      </form>
    </div>
    </>
  );
}

export default LandingPage;
