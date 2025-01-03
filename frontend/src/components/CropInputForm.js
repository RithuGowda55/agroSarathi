import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Back from './Back';
import '../css/CropInputForm.css';

const CropInputForm = () => {
  const [formData, setFormData] = useState({
    temperature: '',
    moisture: '',
    nitrogen: '',
    potassium: '',
    phosphorous: '',
    soilType: '',
    cropType: '',
  });

  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState('');
  const [aisuggestion, setAISuggestion] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(''); // Clear any previous error messages
  };

  const validateInput = () => {
    const { temperature, moisture, nitrogen, potassium, phosphorous } = formData;

    if (temperature < 10 || temperature > 50) {
      return 'Temperature must be between 10°C and 50°C.';
    }
    if (moisture < 10 || moisture > 100) {
      return 'Moisture content must be between 10% and 100%.';
    }
    if (nitrogen < 0 || nitrogen > 50) {
      return 'Nitrogen content must be between 0 and 50.';
    }
    if (potassium < 0 || potassium > 50) {
      return 'Potassium content must be between 0 and 50.';
    }
    if (phosphorous < 0 || phosphorous > 50) {
      return 'Phosphorous content must be between 0 and 50.';
    }

    return ''; // No errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateInput();
    if (validationError) {
      setError(validationError);
      return;
    }

    await predictFertilizer(); // Predict fertilizer on form submission
  };

  // Separate function for fertilizer prediction
  const predictFertilizer = async () => {
    try {
      const response = await axios.post('http://localhost:5000/predict-fertilizer', formData);
      setPrediction(response.data.fertilizer_prediction);
    } catch (error) {
      console.error('Error predicting fertilizer:', error);
      setPrediction('Error: Could not get prediction');
    }
  };

  // Separate function for AI suggestion
  const getNTPSuggestion = async () => {
    try {
      const ntp_output = prediction;
      const response = await axios.post('http://localhost:5000/suggest/ntp', { inputs: formData, ntp_output:ntp_output });
      setAISuggestion(response.data.suggestion);
    } catch (error) {
      console.error('Error getting NTP suggestion:', error);
    }
  };

  return (
    <div className="containerr">
      <Back title="Fertilizer Prediction" />
      <button className="back-button" onClick={() => navigate('/explore')}>
        &#8592;
      </button>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="temperature"
          placeholder="Temperature (°C)"
          min="10"
          max="50"
          onChange={handleChange}
        />
        <input
          type="number"
          name="moisture"
          placeholder="Moisture Content (%)"
          min="10"
          max="100"
          onChange={handleChange}
        />
        <input
          type="number"
          name="nitrogen"
          placeholder="Nitrogen Value in plant"
          min="0"
          max="50"
          onChange={handleChange}
        />
        <input
          type="number"
          name="potassium"
          placeholder="Potassium Value in plant"
          min="0"
          max="50"
          onChange={handleChange}
        />
        <input
          type="number"
          name="phosphorous"
          placeholder="Phosphorous Value in plant"
          min="0"
          max="50"
          onChange={handleChange}
        />
        <select name="soilType" onChange={handleChange} value={formData.soilType}>
          <option value="" disabled>Select Soil Type</option>
          <option value="loamy">Loamy</option>
          <option value="clayey">Clayey</option>
          <option value="sandy">Sandy</option>
          <option value="black">Black</option>
          <option value="red">Red</option>
        </select>

        <input
          type="text"
          name="cropType"
          placeholder="Crop Type"
          onChange={handleChange}
        />
        <button type="submit" className="btn">Predict Fertilizer</button>
      </form>

      <button type="button" onClick={getNTPSuggestion} style={{display:'flex',flexDirection:'column',margin:'21px auto'}}>Get AI Suggestion</button>
      
      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

      {prediction && (
        <div
          className="prediction-card"
          style={{
            borderRadius: '8px',
            backgroundColor: '#f8f9fa',
            padding: '20px',
            marginTop: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            width: '80%',
            maxWidth: '400px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <h3 style={{ fontSize: '20px', color: '#4CAF50' }}>Recommended Fertilizer</h3>
          <p style={{ fontSize: '16px', color: '#333' }}>{prediction}</p>
        </div>
      )}

      {aisuggestion && (
        <div
          className="aisuggestion-card"
          style={{
            borderRadius: '8px',
            backgroundColor: '#f8f9fa',
            padding: '20px',
            marginTop: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            width: '80%',
            maxWidth: '1200px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <h3 style={{ fontSize: '20px', color: '#4CAF50' }}>AI Suggestion</h3>
          <p style={{ fontSize: '16px', color: '#333'}}>{aisuggestion}</p>
        </div>
      )}
    </div>
  );
};

export default CropInputForm;
