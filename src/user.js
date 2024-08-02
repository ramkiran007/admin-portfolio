import React, { useState,useEffect,useCallback ,Suspense} from 'react';
import './App.css';
import AboutView from './about';


import { Element } from 'react-scroll';

import gsap from 'gsap'
import anime from 'animejs';
import animationData3 from './Animation - 1705630346032.json'
import animationData4 from './Animation - 1705708678888-2.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useInView } from 'react-intersection-observer';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { styled } from '@mui/material/styles';

import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const LottieAnimation = React.lazy(() => import('./Constellation'));




// In your App.js or other files where you use these components
//import { LottieAnimation, LottieAnimation3,LottieAnimation4} from './Constellation'; // Update the path as necessary


 



function UserView({ portfolioDetails,isUserViewActive }) {
  console.log("Portfolio Details: ", portfolioDetails);


  const [currentProject, setCurrentProject] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(false);
  useEffect(() => {
    gsap.from(".section-title", { duration: 1, x: -100, opacity: 0 });
    anime.timeline()
      .add({
        targets: '.ml15 .word',
        scale: [14, 1],
        opacity: [0, 1],
        easing: "easeOutCirc",
        duration: 800,
        delay: (el, i) => 800 * i
      });
  }, []);

 
const toggleWorkExperiences = useCallback(() => {
    setCurrentSlide(prev => !prev);
  }, []);
const toggleProject = useCallback(() => {
    setCurrentProject(prev => !prev);
  }, []);
  const WorkExperience=React.memo(({ experience })=>{
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });
                                                     
    return (
        <div 
            ref={ref} 
            className={`work-experience-entry ${inView ? 'work_slide-in-left-in-left work_gradient-background' : ''}`}
        >
        
            <RecipeReviewCard title={experience.title} description = {experience.description}/>
           
        </div>
    );
}
);


// Styled IconButton for expand more action
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function RecipeReviewCard({ title, description }) {
  const [expanded, setExpanded] = React.useState(false);

  // Splitting the description into a preview and the rest
  const previewText = description.length > 100 ? `${description.substring(0, 100)}...` : description;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="recipe-card">

    <Card className="card-hover-effect" sx={{
      maxWidth: 300,
      background: 'rgba(255, 255, 255, 0.8)',
      border: 'solid 1px transparent',
      borderRadius: '15px',
      backgroundImage: 'linear-gradient(#272829, #272829), radial-gradient(circle at top left, #E3651D, #E3651D)',
      backgroundOrigin: 'border-box',
      backgroundClip: 'content-box, border-box',
      boxShadow: '0 5px 20px 0 rgba(0,0,0,.95)',
      animation: 'rotateGradientBorder 10s ease infinite',
      '@keyframes rotateGradientBorder': {
        '0%': {
          backgroundPosition: '0% 50%',
        },
        '50%': {
          backgroundPosition: '100% 50%',
        },
        '100%': {
          backgroundPosition: '0% 50%',
        },
      }
    }}>
       <CardHeader title={title} style={{color:'#d86620cb', fontFamily: 'Nunito'}}/>
       <CardContent>
          {!expanded && (
            <Typography variant="body2" color="#fafafaa6">
              {previewText}
            </Typography>
          )}
        </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          sx={{ transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)', marginLeft: 'auto', color: '#fafafaa6', transition: (theme) => theme.transitions.create('transform', { duration: theme.transitions.duration.shortest }) }}
        >
          <ExpandMoreIcon style={{color:'orange'}}/>
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph style={{color:'#fafafaa6',fontFamily: 'Nunito'}}>{description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
    </div>
  );
}
const Project = React.memo(({ experience })=>{
  const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.5,
  });

  return (
      <div 
      
          ref={ref} 
          className={`work-experience-entry  ${inView ? 'project_slide-in-left work_gradient-background' : ''}`}
      >
          
          
          <RecipeReviewCard  title={experience.title} description={experience.description}/>
          </div>
          
        

          
  );
});
 
  
  
  return (
    <div className="gradient-background">
      
    
    <div className="profile-section fadeInScaleUp">
       

<h1 className="ml15" style={{ fontFamily: 'Nunito' }}>
  <b>
    {['Hi,','I am','Ram', 'Kiran', 'Meduri'].map((word, index) => (
      <span 
        className="word"
        style={{ display: 'inline-block', lineHeight: '0em' }} 
        key={index}>
        {word}
        {index < 2 && ' '} {/* Adding space between words except after the last word */}
      </span>
    ))}
  </b>
</h1>



    </div>

<div>
<Element name="homeSection">

    <div className={`project-container slide-in ${currentProject ? 'currentProject' : ''}`}>
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
    <div  
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', position: 'relative',flexGrow: 1  }} 
          onMouseOver={e => gsap.to(e.currentTarget, { scale: 1.2 })} 
          onMouseOut={e => gsap.to(e.currentTarget, { scale: 1 })}
          onClick={toggleProject} 
        >
    /*       
  <h2 className="projectsection-title section-container" style={{ 
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
    Projects
 <span className='section-button' style={{ fontSize: '30px', marginRight: '1px',marginLeft:"190px", flexShrink: 0 }}>➜</span>


  </h2>
  */
           <h2>Projects</h2>
   <div id="" class="vertical-timeline-element">
    <span class="vertical-timeline-element-icon bounce-in" style="background: rgb(56, 62, 86);">
        <div class="flex justify-center items-center w-full h-full">
        </div>
    </span>
    <div class="vertical-timeline-element-content bounce-in" style="background: rgb(29, 24, 54); color: rgb(255, 255, 255);">
        <div class="vertical-timeline-element-content-arrow" style="border-right-width: 7px; border-right-style: solid; border-right-color: rgb(35, 38, 49);"></div>
        <div>
            <h3 class="text-white text-[24px] font-bold">Codeforces</h3>
            <div class="absolute inset-0 flex justify-end m-3 card-img_hover">
                <div class="bg-white w-10 h-10 rounded-full flex justify-center items-center cursor-pointer">
                </div>
            </div>
            <p class="text-secondary text-[16px] font-semibold" style="margin: 0px;"></p>
        </div>
        <ul class="mt-5 list-disc ml-5 space-y-2">
            <li class="text-white-100 text-[14px] pl-1 tracking-wider">Codeforces is a great platform for building problem-solving skills and practicing coding questions. It has various language tracks that we can complete to earn stars and showcase our proficiency in that language. I've solved 100+ questions on Codeforces, and it was the first platform I used to start my competitive programming journey. I have the highest rating of 1031.</li>
        </ul>
        <span class="vertical-timeline-element-date">March 2022 - present</span>
    </div>
</div>

  </div>
  {isUserViewActive && (
  <Suspense fallback={<div>Loading animations...</div>}>
  <LottieAnimation animationData={animationData4} height={200} width={500} />
  </Suspense>
  )}
</div>
   {/* Projects */}
     
   {currentProject  &&(
  <div className="project-details ">
    <div className='card-container'>
    {portfolioDetails.projects && portfolioDetails.projects.length > 0 && (
      portfolioDetails.projects.map((experience, index) => (

        <Project key={index} experience={experience} />
      

      ))
    )}
      </div>
   
  </div>
)}
</div>






   

      
                
                <div className={`work-experience-container slide-in ${currentSlide ? 'currentSlide' : ''}`}>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                {isUserViewActive && (
                <Suspense fallback={<div>Loading animations...</div>}>
        <LottieAnimation animationData={animationData3} height={300} width={700} />
        </Suspense>
                )}
       
        <div  
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', position: 'relative',flexGrow: 1  }} 
          onMouseOver={e => gsap.to(e.currentTarget, { scale: 1.2 })} 
          onMouseOut={e => gsap.to(e.currentTarget, { scale: 1 })}
          onClick={toggleWorkExperiences} 
        >
          

  <h2 className="section-title section-container"  style={{ 
      backgroundImage: 'linear-gradient(to right,  #e85d04, rgba(254,127,45,0))',
      
      color: "black", 
      marginLeft: '0px', 
      padding: '10px 20px', 
      flexGrow: 1,
      borderTopLeftRadius: '20px', 
      borderBottomLeftRadius: '20px',
      borderTopRightRadius: '5px',
      borderBottomRightRadius: '5px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      fontFamily: 'Nunito',
      boxShadow: '0 5px 20px 0 rgba(0,0,0,.95)'

      
      
  }}>
 Work Experience
 <span className='section-button' style={{ fontSize: '30px', marginRight: '190px',marginLeft:"10px", flexShrink: 0 }}>➜</span>

  </h2>
  </div>
  
  
</div>

{currentSlide &&(
  <div className="work-experience-details">
     <div className='card-container'>
    {portfolioDetails.workExperiences && portfolioDetails.workExperiences.length > 0 && (
      portfolioDetails.workExperiences.map((experience, index) => (
        <WorkExperience key={index} experience={experience} />

      ))
    )}
  </div>
  </div>
)}

</div>
</Element>
</div>

<div>
<Element name="aboutSection">

  <AboutView portfolioDetails={portfolioDetails}/>
  </Element>
  </div>


      

    </div>
  
  );

  
}



export default React.memo(UserView);
