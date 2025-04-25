import React from 'react';
import './App.css';
import profiles from './uploads/pexels-puwadon-sang-ngern-2168173-5340280.jpg'
import profiles2 from './uploads/pexels-samography-814718-1687633.jpg'
import icon from './uploads/upload.png'
import pdf from './uploads/CancerDiagnosis.pdf'
import pdf2 from './uploads/Airline Analysis.pdf'

const PortfolioCard = () => {
  return (  
    <div className="cards-container">
      {/* First Card */}
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
            The Cancer Diagnosis project uses data from the Memorial Sloan Kettering Cancer 
            Center to classify genetic mutations via machine learning models. It involves preprocessing, analysis, 
            and model evaluation to improve cancer mutation classification and treatment.
          </p>
        </div>
      </div>

      {/* Second Card */}
      <div className="card">
        <div className="carder-image-container">
          <img
            src={profiles2}
            alt="project_image"
            className="card-image"
          />
          <div className="card-hover">
            <a href={pdf2} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', height: '100%' }}>
              {/* Additional content can go here if needed */}
            </a>
          </div>
        </div>
        
        <div className="carder-content">
          <p className="carder-title">Airline Analysis</p>
          <p className="card-description">
            This report analyzes domestic flight data from Q1 2019 to identify the best round-trip
            routes for a new airline entering the US market. The company plans to launch 5 routes
            using new airplanes that cost $90 million each, with a brand promise of --On time, for you.
          </p>      
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
