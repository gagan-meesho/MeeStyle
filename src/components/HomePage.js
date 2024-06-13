import React from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import {useState} from "react";
import LinearProgressBar from "./animations/LinearProgressBar";
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
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] =useState('')
  const [imageFinal,setImageFinal]=useState('')  
  const handleInputChange = (event) => {
      setPrompt(event.target.value);
    };
  const handleOpen = (selectedImage) => {
    setOpen(true);
    console.log(selectedImage)
    setImageFinal(selectedImage)
    navigate('/instruction-place', {
      state: { imageFinal },
    });

  };
  const handleClose = () => {
    setOpen(false);
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
          height: '80vh',
          overflowY: 'scroll'
        }}>
          {messages.map((message, index) => (
              <div key={index} style={{
                textAlign: message.type === 'prompt' ? 'right' : 'left',
                margin: '10px'
              }}>
                {message.type === 'prompt' ? (
                    <div style={{
                      display: 'inline-block',
                      backgroundColor: '#daf1da',
                      padding: '10px',
                      borderRadius: '10px'
                    }}>
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
                              onClick={handleOpen}
                          />
                      ))}
                    </div>
                )}
              </div>
          ))}
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px'
        }}
             className={`${loading ? 'no-disable' : 'disabled'}`}>
          <input
              type="text"
              value={prompt}
              onChange={handleInputChange}
              style={{flexGrow: 1, marginRight: '10px'}}
              placeholder="Describe your requirements..."

          />
          <button onClick={handleClick}>Send</button>
        </div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
          <Box sx={{...style, width: 200}}>
            <img
                src={`data:image/png;base64,${selectedImage}`}
                className='generated-image-modal'
                onClick={() => navigate('/instruction-place', {
                  state: { selectedImage },
                })}
            />
            <Button onClick={handleClose}>Close Child Modal</Button>
          </Box>
        </Modal>
      </div>
  );
};

export default HomePage;