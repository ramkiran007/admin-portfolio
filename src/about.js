import React, { useState ,useCallback ,Suspense} from 'react';
import './App.css';
import Typewriter from 'typewriter-effect';
import ContactForm from'./contact'

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

  const Education = React.memo(({experience })=>{
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });
  
    return (
        <div 
            ref={ref} 
            className={`education-entry ${inView ? 'project_slide-in-left work_gradient-background' : ''}`}
        >
            <h5 className="experience-title " style={{ color: "#E26A2C", fontFamily: 'Nunito',fontSize: '30px'}}>{JSON.parse(JSON.stringify(experience.title))}</h5>
            <p style={{color:'#fafafaa6'}}>{experience.description}</p>
        </div>
        
    );
  });

  

    return (
      <div>
      

<div className={`education-container slide-in ${currentEducation ? 'currentEducation' : ''}`}>
<div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
<div  
      style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', position: 'relative',flexGrow: 1  }} 
      onMouseOver={e => gsap.to(e.currentTarget, { scale: 1.2 })} 
      onMouseOut={e => gsap.to(e.currentTarget, { scale: 1 })}
      onClick={toggleEducation} 
    >
<h2 className="section-title section-container" style={{ 
  background: 'linear-gradient(to left, #e85d04, rgba(254,127,45,0))', // Gradient to the left
  color: "#000000", 
  alignItems: "center",
  justifyContent: "right",

  display:"flex",
  marginRight: '0px', 
  padding: '10px 20px', 
  flexGrow: 0.5,
  borderTopRightRadius: '20px', // Oval right top corner
  borderBottomRightRadius: '20px', // Oval right bottom corner
  borderTopLeftRadius: '5px', // Slightly rounded left top corner
  borderBottomLeftRadius: '1px', // Slightly rounded left bottom corner
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  fontFamily: 'Nunito',
  boxShadow: '0 5px 20px 0 rgba(0,0,0,.95)'
}}>
Education
<span className='section-button' style={{ fontSize: '30px', marginRight: '1px',marginLeft:"190px", flexShrink: 0 }}>➜</span>


</h2>
</div>

  <Suspense fallback={<div>Loading animations...</div>}>
  <LottieAnimation animationData={animationData5} height={300} width={600} />
  </Suspense>

</div>
{/* Projects */}
 
{currentEducation  &&(
<div className="education-details ">
{portfolioDetails.about && portfolioDetails.about.length > 0 && (
  portfolioDetails.about.map((experience, index) => (
    <Education key={index} experience={experience} />

  ))
)}
</div>
)}
</div>
<div className="profile-section fadeInScaleUp">
{console.log("about check"+portfolioDetails.image)}
        {portfolioDetails.image && (
            <img
                className="profile-image shadow-effect"
                src={portfolioDetails.image}
                alt="Profile"
                style={{ width: '250px', borderRadius: '50%' }}
            />
        )}
{process.env.NODE_ENV !== 'test' && (
  <div style={{color:'#fafafaa6'}}>
    <Typewriter
      options={{loop: true}}
      onInit={(typewriter) => {
        typewriter.typeString('Full Stack Engineer | Software Developer').start();
      }}
    />
  </div>
)}
    
     
    </div>
    <ContactForm/>
</div>
    
      
    );
}

export default React.memo(AboutView);
