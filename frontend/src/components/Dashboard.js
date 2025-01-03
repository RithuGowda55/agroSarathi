import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Imort the AuthContext
import '../css/Dashboard.css'; // Import the styles
import Back from './Back';

const Dashboard = () => {
  const { auth } = useAuth(); // Access auth state from context

  // If not authenticated, redirect to login page
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Back title="Explore" />
      <div className="dashboard">
        <div className="cards-container">
          <div className="cardd">
            <Link to="/CropInputForm" className="cardd-link">
              <div className="cardd-content">
                <h2>NTP</h2>
                <p>Manage crop inputs and nutrients.</p>
              </div>
            </Link>
          </div>
          <div className="cardd">
            <Link to="/irrigation" className="cardd-link">
              <div className="cardd-content">
                <h2>Irrigation</h2>
                <p>Monitor and manage irrigation systems.</p>
              </div>
            </Link>
          </div>
          <div className="cardd">
            <Link to="/price" className="cardd-link">
              <div className="cardd-content">
                <h2>Price</h2>
                <p>Check crop pricing and market trends.</p>
              </div>
            </Link>
          </div>
          <div className="cardd">
            <Link to="/pdd" className="cardd-link">
              <div className="cardd-content">
                <h2>Plant Disease</h2>
                <p>Detect Plant Diseases and analyze them.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
