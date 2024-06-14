import React from "react";
import {useState} from "react";
import LinearProgressBar from "./animations/LinearProgressBar";
import ButtonGroup from "./ButtonGroup"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane,faSpinner } from '@fortawesome/free-solid-svg-icons';

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
  const [messages, setMessages]=useState([])
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null); // State to manage selected image for the modal

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

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
    setPrompt('')
    setMessages(prevMessages => [
      ...prevMessages,
      { type: 'prompt', content: prompt }
    ]);
   
    const url = 'https://asia-southeast1-aiplatform.googleapis.com/v1/projects/meesho-datascience-prd-0622/locations/asia-southeast1/publishers/google/models/imagegeneration@005:predict';
    const token = 'ya29.a0AXooCgsYvHFtImsmykQ6xhfhZ_IoHGbfi6EytsqS2_eGqD8V14l1GrqX_1EzOeEW61FJBXfMBOIxj2YzRfUd0eKqUDgrw-Bht_8WHKsboppFrCkvHUaLnSIVfmh7_kEHyxGj3R9lWFNfltgFyTTGcu52FbssW_E0_6gW_Ri21KUaCgYKAUoSARASFQHGX2MiJ2BI-V8A7vfPtUvb0nqm_w0178';

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
        { type: 'response', content: images }
      ]);
      setPrompt('');
      setLoading(false);
    } catch (error) {
      console.error('Error making the API call:', error);
    }
  };

  const b64toBlob = (b64Data, contentType, sliceSize=512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

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
              onKeyDown={handleKeyDown}
          />
          <button className="round-button" onClick={handleClick}>
            {loading?<FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faPaperPlane}/>}
          </button>

        </div>
        {selectedImage && (
            <div
                className='image-modal'
            >
              <div style={{height:"80vh", width: "80vw"}}>
                <img
                    src={`data:image/png;base64,${selectedImage}`}
                    alt="Modal Content"
                    style={{ height:'80vh',width:'80vw' , borderRadius:'0.5rem'}}
                />
              </div>
              <div>
                <ButtonGroup onClose={closeModal} data={URL.createObjectURL(b64toBlob(selectedImage, 'image/png'))}/>
              </div>
            </div>
        )}
      </div>
  );
};

export default HomePage;