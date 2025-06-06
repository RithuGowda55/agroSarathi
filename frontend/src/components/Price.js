import React, { useState } from 'react';
import axios from 'axios';
import Hero from './Hero';
import Back from './Back';
import { useNavigate } from 'react-router-dom';
import Purchases from './Purchases';

function PricePrediction() {
    const [formData, setFormData] = useState({
        State: '',
        District: '',
        Market: '',
        Commodity: '',
        Variety: '',
        Grade: ''
    });
    const navigate = useNavigate();

    const [prediction, setPrediction] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/predict/price', formData);
            setPrediction(response.data);
        } catch (error) {
            console.error('Error fetching prediction:', error);
        }
    };

    return (
        <>
            <Back title='Price Prediction' />
            <div style={{ margin: "20px" }}>
            <div className="lists" style={{ marginBottom: '15px' ,marginTop: '20px'}}>
                <ul className="range-list">
                    <li>Commodity : Product you want to buy</li>
                    <li>Variety : variation of your commodity</li>
                    <li>Grade : Quality (A,B,C or FAQ)</li>
                </ul>
                </div>
                <button className="back-button" onClick={() => navigate('/explore')} style={{ fontSize: '20px', padding: '10px' }}>
                    &#8592;
                </button>

                <form onSubmit={handleSubmit} style={{display: 'flex', 'flex-direction': 'column',gap: '1rem','margin-top': '100px','flex wrap': 'wrap','align content': 'stretch','align-items': 'stretch','justify-content': 'space-around' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <label style={{ flex: 1 }}>State:</label>
                        <input
                            type="text"
                            name="State"
                            value={formData.State}
                            onChange={handleChange}
                            required
                            style={{ flex: 2, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <label style={{ flex: 1 }}>District:</label>
                        <input
                            type="text"
                            name="District"
                            value={formData.District}
                            onChange={handleChange}
                            required
                            style={{ flex: 2, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <label style={{ flex: 1 }}>Market:</label>
                        <input
                            type="text"
                            name="Market"
                            value={formData.Market}
                            onChange={handleChange}
                            required
                            style={{ flex: 2, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <label style={{ flex: 1 }}>Commodity:</label>
                        <input
                            type="text"
                            name="Commodity"
                            value={formData.Commodity}
                            onChange={handleChange}
                            required
                            style={{ flex: 2, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <label style={{ flex: 1 }}>Variety:</label>
                        <input
                            type="text"
                            name="Variety"
                            value={formData.Variety}
                            onChange={handleChange}
                            required
                            style={{ flex: 2, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <label style={{ flex: 1 }}>Grade:</label>
                        <input
                            type="text"
                            name="Grade"
                            value={formData.Grade}
                            onChange={handleChange}
                            required
                            style={{ flex: 2, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#1eb2a6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            marginTop: '20px',
                            alignSelf: 'center'
                        }}
                    >
                        Get Price
                    </button>
                </form>

                {prediction && (
                    <>
                    <div style={{
                        backgroundColor: '#f4f4f4',
                        padding: '20px',
                        marginTop: '28px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        maxWidth: '400px',
                        margin: 'auto'
                    }}>
                        <h3 style={{ color: '#1eb2a6', textAlign: 'center' }}>Predicted Prices:</h3>
                        <div style={{ marginBottom: '10px' }}>
                            <strong>Min Price: </strong><span>{prediction.Min_Price} per Quintol</span>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <strong>Max Price: </strong><span>{prediction.Max_Price} per Quintol</span>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <strong>Avg Price: </strong><span>{prediction.Modal_Price} per Quintol</span>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <img src={prediction.graph} alt="Price Prediction Graph" />
                        </div>
                    </div>
                    </>
                )}
                <div>
                    <Purchases />
                </div>

            </div>
        </>
    );
}

export default PricePrediction;
