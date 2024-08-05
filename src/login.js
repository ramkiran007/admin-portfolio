import React from 'react';
import './App.css';
import profiles from './uploads/pexels-puwadon-sang-ngern-2168173-5340280.jpg'
import icon from './uploads/upload.png'
import pdf from '/home/ramkiranmeduri_3/admin-portfolio/src/uploads/CancerDiagnosis.pdf'
const PortfolioCard = () => {
  return (
    <div className="card">
      <div className="carder-image-container">
        <img
          src={profiles}
          alt="project_image"
          className="card-image"
        />
<div className="card-hover">
  <a href={pdf} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', height: '100%' }}>
    {/* Additional content can go here if needed */}
  </a>
</div>

       
      </div>
      <div className="carder-content">
        <p className="carder-title">Cancer diagnosis</p>
        <p className="card-description">
          Designed and developed a portfolio website using React. Utilized responsive design to ensure the website looks good on different devices and screen sizes. Ensured responsive design for optimal user experience.
        </p>
        
      </div>
    </div>
  );
};

export default PortfolioCard;
