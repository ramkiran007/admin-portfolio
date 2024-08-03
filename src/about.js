import React, { useState ,useCallback ,Suspense} from 'react';
import './App.css';
import Typewriter from 'typewriter-effect';
import ContactForm from'./contact'
import profileImage from './IMG_0002_Original.jpg'; // Adjust the path as necessary


import { useInView } from 'react-intersection-observer';
import gsap from 'gsap'
import 'bootstrap/dist/css/bootstrap.min.css';
import animationData5 from './Animation - 1705708670002.json'
const LottieAnimation = React.lazy(() => import('./Constellation'));


function AboutView({ portfolioDetails }) {
  
  //const imageUrl = portfolioDetails.image ? portfolioDetails.image:null;

  const [currentEducation, setCurrentEducation] = useState(false);
 


  const toggleEducation = useCallback(() => {
    setCurrentEducation(prev => !prev);
  }, []);

 

  

    return (
      <div>
      


<div className="profile-section fadeInScaleUp">
        {(
            <img
                className="profile-image shadow-effect"
                src={profileImage}
                alt="Profile"
                style={{ width: '250px', borderRadius: '50%' }}
            />
        )}

  <div style={{color:'##0f172a'}}>
    <Typewriter
      options={{loop: true}}
      onInit={(typewriter) => {
        typewriter.typeString('Data Analyst | Data Scientist').start();
      }}
    />
    
  </div>
  
  

    
     
    </div>
    <ContactForm/>
</div>
    
      
    );
}

export default React.memo(AboutView);
