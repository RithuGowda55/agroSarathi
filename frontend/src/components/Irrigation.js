import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Back from './Back';
// import "../css/irri.css"

const Irrigation = () => {
  const [irrigationData, setIrrigationData] = useState({
    CropType: '',
    CropDays: '',
    SoilMoisture: '',
    temperature: '',
    Humidity: '',
  });

  const [waterData, setWaterData] = useState({
    'CROP TYPE': '',
    'SOIL TYPE': '',
    'REGION': '',
    'TEMPERATURE': '',
    'WEATHER CONDITION': '',
  });

  const [irrigationPrediction, setIrrigationPrediction] = useState(null);
  const [waterPrediction, setWaterPrediction] = useState(null);
  const [aisuggestion, setAISuggestion] = useState(null);
  const [error, setError] = useState(''); // New state for error messages

  const navigate = useNavigate();

  // Handle input change for irrigation data
  const handleIrrigationInputChange = (e) => {
    const { name, value } = e.target;
    setIrrigationData({
      ...irrigationData,
      [name]: value,
    });
  };

  // Handle input change for water data
  const handleWaterInputChange = (e) => {
    const { name, value } = e.target;
    setWaterData({
      ...waterData,
      [name]: value,
    });
  };

  const validateInput = () => {
    const { temperature, SoilMoisture, Humidity } = irrigationData;

    if (temperature < 10 || temperature > 50) {
      return 'Temperature must be between 10°C and 50°C.';
    }
    if (SoilMoisture < 10 || SoilMoisture > 100) {
      return 'Soil Moisture must be between 10% and 100%.';
    }
    if (Humidity < 0 || Humidity > 100) {
      return 'Humidity must be between 0% and 100%.';
    }

    return ''; // No errors
  };

  // Function to handle irrigation prediction
  const predictIrrigation = async () => {
    const validationError = validateInput();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(''); // Clear previous errors

    try {
      const response = await axios.post('http://localhost:5000/predict/irrigation', irrigationData);
      setIrrigationPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error predicting irrigation:', error);
    }
  };

  // Function to handle water requirement prediction
  const predictWater = async () => {
    try {
      const response = await axios.post('http://localhost:5000/predict/water', waterData);
      setWaterPrediction(response.data.predicted_water_requirement);
    } catch (error) {
      console.error('Error predicting water requirement:', error);
    }
  };

  const getIrrigationSuggestion = async () => {
    try {
      const response = await axios.post('http://localhost:5000/suggest/irrigation', {
        inputs: irrigationData,
        irrigation_output: irrigationPrediction,
        water_output: waterPrediction,
      });
      setAISuggestion(response.data.suggestion);
    } catch (error) {
      console.error('Error getting irrigation suggestion:', error);
    }
  };

  return (
    <div className="Appp" style={{ margin: '20px' }}>
      <button className="back-button" onClick={() => navigate('/explore')}>
        &#8592;
      </button>
      <Back title="Prediction Tool" />

      {error && (
        <div style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>
          {error}
        </div>
      )}

<div className="lists" style={{ marginBottom: '20px' }}>
      <ul className="range-list">
        <li>Temperature: -10°C to 50°C</li>
        <li>Soil Moisture: 100 - 1100</li>
        <li>Humidity: 11 - 85</li>
        <li>Crop days : Remaining days of 1-210 days</li>
        <li>Soil type: Mention nature</li>
      </ul>
    </div>

      {/* Remaining code */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
  {/* Irrigation Prediction Form */}
  <div style={{ flex: 1 }}>
    <h2 style={{ color: '#1eb2a6', fontSize: '2rem', textAlign: 'center' }}>Irrigation Prediction</h2>
    <form>
      <input
        type="text"
        name="CropType"
        value={irrigationData.CropType}
        onChange={handleIrrigationInputChange}
        placeholder="Crop Type"
      />
      <input
        type="number"
        name="CropDays"
        min="1"
        max="365"
        value={irrigationData.CropDays}
        onChange={handleIrrigationInputChange}
        placeholder="Crop Days"
      />
      <input
        type="number"
        name="SoilMoisture"
        min="0"
        max="100"
        value={irrigationData.SoilMoisture}
        onChange={handleIrrigationInputChange}
        placeholder="Soil Moisture"
      />
      <input
        type="number"
        name="temperature"
        min="0"
        max="50"
        value={irrigationData.temperature}
        onChange={handleIrrigationInputChange}
        placeholder="Temperature"
      />
      <input
        type="number"
        name="Humidity"
        min="0"
        max="100"
        value={irrigationData.Humidity}
        onChange={handleIrrigationInputChange}
        placeholder="Humidity"
      />
      <button type="button" onClick={predictIrrigation}>Predict Irrigation</button>
    </form>
    {irrigationPrediction !== null && (
      <div style={{ marginTop: '20px', textAlign: 'center', color: '#4CAF50' }}>
        <h3>Irrigation Prediction</h3>
        <p>{irrigationPrediction}</p>
      </div>
    )}
  </div>

  {/* Water Requirement Prediction Form */}
  <div style={{ flex: 1 }}>
    <h2 style={{ color: '#1eb2a6', fontSize: '2rem', textAlign: 'center' }}>Water Requirement Prediction</h2>
    <form>
      <input
        type="text"
        name="CROP TYPE"
        value={waterData['CROP TYPE']}
        onChange={handleWaterInputChange}
        placeholder="Crop Type"
      />
      <input
        type="text"
        name="SOIL TYPE"
        value={waterData['SOIL TYPE']}
        onChange={handleWaterInputChange}
        placeholder="Soil Type"
      />
      <input
        type="text"
        name="REGION"
        value={waterData['REGION']}
        onChange={handleWaterInputChange}
        placeholder="Region"
      />
      <input
        type="number"
        name="TEMPERATURE"
        value={waterData['TEMPERATURE']}
        onChange={handleWaterInputChange}
        placeholder="Temperature"
      />
      <input
        type="text"
        name="WEATHER CONDITION"
        value={waterData['WEATHER CONDITION']}
        onChange={handleWaterInputChange}
        placeholder="Weather Condition"
      />
      <button type="button" onClick={predictWater}>Predict Water Requirement</button>
    </form>
    {waterPrediction !== null && (
      <div style={{ marginTop: '20px', textAlign: 'center', color: '#4CAF50' }}>
        <h3>Water Requirement Prediction</h3>
        <p>{waterPrediction} litre/acre</p>
      </div>
    )}
  </div>
</div>

{/* AI Suggestion */}
<button
  type="button"
  onClick={getIrrigationSuggestion}
  style={{ display: 'block', margin: '20px auto' }}
>
  Get AI Suggestion
</button>
{aisuggestion !== null && (
  <div
    style={{
      borderRadius: '8px',
      backgroundColor: '#f8f9fa',
      padding: '20px',
      marginTop: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      maxWidth: '800px',
      margin: 'auto',
    }}
  >
    <h3 style={{ fontSize: '20px', color: '#4CAF50' }}>AI Suggestion</h3>
    <p style={{ fontSize: '16px', color: '#333' }}>{aisuggestion}</p>
  </div>
)}

    </div>
  );
};

export default Irrigation;
