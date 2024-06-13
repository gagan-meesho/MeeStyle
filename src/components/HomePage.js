import React from "react";
import {useState} from "react";
import LinearProgressBar from "./animations/LinearProgressBar";
import ButtonGroup from "./ButtonGroup"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane,faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const HomePage = () =>{
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null); // State to manage selected image for the modal

  const handleInputChange = (event) => {
      setPrompt(event.target.value);
    };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleClick = async () => {
    if (!prompt || loading) return;
    setLoading(true);
    const url = 'https://asia-southeast1-aiplatform.googleapis.com/v1/projects/meesho-datascience-prd-0622/locations/asia-southeast1/publishers/google/models/imagegeneration@005:predict';
    const token = 'ya29.a0AXooCguc35tE_is6ZKYHB0egaBhNyDWW_jT05K_1rWk5-BVQfF3hDy3sMT-CkZzJn0-4rojhalHBjb7hTWQ1Ftz3_MuhdIQC7ulwd9WePNiLFiPi0jv7kx40v6l0qkDzsnoFCMiA_mAajPNapIGDYwjQi5stqoTDRPUYgF63xRUaCgYKARMSARASFQHGX2MiX8BOStM3dNxWfDedWgDqPQ0178';

    const data = {
      "instances": [
        {
          "prompt": prompt
        }
      ],
      "parameters": {
        "sampleCount": 4,
        "addWaterMark": true
      }
    };
    console.log("before sending request");
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const predictions = result.predictions;
      const images = predictions.map(item => item.bytesBase64Encoded);

      setMessages(prevMessages => [
        ...prevMessages,
        { type: 'prompt', content: prompt },
        { type: 'response', content: images }
      ]);
      setPrompt('');
      setLoading(false);
    } catch (error) {
      console.error('Error making the API call:', error);
    }
  };
  return (
      <div>
        {loading && <LinearProgressBar/>}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '85vh',
          overflowY: 'scroll'
        }}>
          {messages.map((message, index) => (
              <div key={index} style={{
                textAlign: message.type === 'prompt' ? 'right' : 'left',
                margin: '10px'
              }}>
                {message.type === 'prompt' ? (
                    <div className="message-box">
                      {message.content}
                    </div>
                ) : (
                    <div style= {{display:"flex", maxWidth:"100vw", flexWrap:'wrap', justifyContent:"space-evenly"}}>
                      {message.content.map((base64String, idx) => (
                          <img
                              key={idx}
                              src={`data:image/png;base64,${base64String}`}
                              alt={`Generated ${index}-${idx}`}
                              className='generated-image'
                              onClick={()=>openModal(base64String)}
                          />
                      ))}
                    </div>
                )}
              </div>
          ))}
        </div>
        <div
            className={`footer ${loading ? 'no-disable' : 'disabled'}`}>
          <input
              type="text"
              value={prompt}
              onChange={handleInputChange}
              style={{flexGrow: 1, marginRight: '10px'}}
              placeholder="Describe your requirements..."
              className='input-box'
          />
          <button className="round-button" onClick={handleClick}>
            {loading?<FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faPaperPlane}/>}
          </button>

        </div>
        {selectedImage && (
            <div
                className='image-modal'
            >
              <div>
                <img
                    src={`data:image/png;base64,${selectedImage}`}
                    alt="Modal Content"
                    style={{ maxHeight: '100%', maxWidth: '100%' , borderRadius:'0.5rem'}}
                />
              </div>
              <div>
                <ButtonGroup onClose={closeModal} data={selectedImage}/>
              </div>
            </div>
        )}
      </div>
  );
};

export default HomePage;