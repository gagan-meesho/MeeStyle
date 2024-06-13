import React from "react";
import {MDBBtn, MDBInput} from "mdb-react-ui-kit";
import {useState} from "react";
const HomePage = () =>{
  const [imageData, setImageData] = useState([]);
  const [prompt, setPrompt] = useState(null);

  const handlePrompt =(e)=>{
    setPrompt(e.target.value);
  }
  const handleClick = async () => {
    const url = 'https://asia-southeast1-aiplatform.googleapis.com/v1/projects/meesho-datascience-prd-0622/locations/asia-southeast1/publishers/google/models/imagegeneration@005:predict';
    const token = 'ya29.a0AXooCguywCStkrZLc1QJuM5GTG42PBVI_GInlozjzAp5pDWskV47KwGtUD_XfjvSwIENPegC9oKx7tsIsQf1N2BQG-WQAWNQEYbrM8MrDsPyglPfpEt-Oz6k-DkfTjBTa20b82HEd_ss4GhuXmmV3BUGU9Hwdv7Y0Sds8oxSoyAaCgYKAdwSARASFQHGX2MiZFZEM4yetVe9qo_hcmKCrg0178';

    const data = {
      "instances": [
        {
          "prompt": "t shirt for hackathon event for meesho"
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

      for(var i=0;i<predictions.length;i++){
        console.log(predictions[i]);
        console.log(predictions[i].bytesBase64Encoded);
      }
      setImageData(predictions);
    } catch (error) {
      console.error('Error making the API call:', error);
    }
  };
  return (
      <div>
        <div>
          {imageData.length > 0 && (
              <div>
                {imageData.map((base64String, index) => (
                    <img
                        key={index}
                        src={`data:image/png;base64,${base64String.bytesBase64Encoded}`}
                        alt={`Generated ${index}`}
                        style={{margin: '10px'}}
                    />
                ))}
              </div>
          )}
        </div>
        <div>
          <MDBInput wrapperClass='mb-4' placeholder={'Enter your prompt...'} id='form1' type='text' onChange={handlePrompt}/>
          <MDBBtn className="mb-4 w-100" onClick={handleClick}>Submit</MDBBtn>
        </div>
      </div>
  );
};

export default HomePage;