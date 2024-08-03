import React, { useState,useEffect,useCallback ,Suspense} from 'react';
import './App.css';
import AboutView from './about';
import animation1 from './ihtyN22VL9.json' 
import AOS from 'aos';
import Heatmap from './login'

import { Element } from 'react-scroll';

import gsap from 'gsap'
import anime from 'animejs';

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
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

 




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

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '35vh', backgroundColor: 'rgb(240, 240, 240)' }}>
      <div className="timeline-element center" style={{ width: '60%', position: 'relative' }}>
       
        <div className="timeline-element-content bounce-in" style={{ background: 'hsl(185, 77%, 86%)', color: '#334155', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <div className="timeline-element-content-arrow" style={{ display: 'none' }}></div>
          <div>
            <h3 className="text-24px font-bold" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>Introduction</h3>
            <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
              {/* Any additional hover effect */}
            </div>
            <p className="text-secondary text-16px font-semibold" style={{ margin: 0, fontSize: '16px', textAlign: 'center' ,color:'#1e293b'}}>Your introduction goes here. You can write about your professional background, skills, and experiences. Make it concise and impactful to leave a good impression.</p>
          </div>
        </div>
      </div>
    </div>
    <br/>
    <br/>
    
    <div style={{  height: '250vh', backgroundColor: 'rgb(240, 240, 240)' }}>
      <br/>

    <div data-aos="fade-up">

<h2 className=" font-bold"> Work Experience </h2>
</div>



    <div>
    <div data-aos="fade-up-right" data-aos-duration="3000">

    <div className="timeline">
    
  <div className="timeline-element left">
    <span className="timeline-element-icon bounce-in" style={{ background: 'rgb(56, 62, 86)' }}>
        <div className="flex justify-center items-center w-full h-full">
          
        </div>
    </span>
    <div className="timeline-element-content bounce-in" style={{ background: 'hsl(185, 77%, 86%)', color: '#334155' }}>
        <div className="timeline-element-content-arrow" style={{ borderRightWidth: '7px', borderRightStyle: 'solid', borderRightColor: 'rgb(35, 38, 49)' }}></div>
        <div>
            <h3 className="text-24px font-bold" >Cardinal Health</h3>
            <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
                
            </div>
            <p className="text-secondary text-16px font-semibold" style={{ margin: 0 }}></p>
        </div>
        <ul className="mt-5 list-disc ml-5 space-y-2 ">
        <li className="text-white-100 text-14px pl-1 tracking-wider">Led the design and implementation of a data analysis system to enhance Cardinal Health’s supply chain efficiency and inventory management.</li>
<li className="text-white-100 text-14px pl-1 tracking-wider">Developed advanced data models and dashboards to provide actionable insights into inventory levels and supply chain operations.</li>
<li className="text-white-100 text-14px pl-1 tracking-wider">Utilized data-driven strategies to optimize inventory management, reducing operational costs and improving resource allocation.</li>
<li className="text-white-100 text-14px pl-1 tracking-wider">Collaborated with supply chain and IT teams to integrate data analysis tools into existing workflows, streamlining processes and enhancing performance.</li>
<li className="text-white-100 text-14px pl-1 tracking-wider">Monitored key performance metrics and adjusted strategies based on data insights to ensure continuous improvement in supply chain operations.</li>
        </ul>
        <span className="timeline-element-date">June 2023 - present</span>
    </div>
   
    
  </div>
  </div>

  
  
  

</div>
  <div data-aos="fade-up-left" data-aos-duration="3000">
<div className="timeline">
  <div className="timeline-element right">
    <span className="timeline-element-icon bounce-in" style={{ background: 'rgb(56, 62, 86)' }}>
        <div className="flex justify-center items-center w-full h-full">
          
        </div>
    </span>
    <div className="timeline-element-content bounce-in" style={{ background: 'hsl(185, 77%, 86%)', color: '#334155' }}>
        <div className="timeline-element-content-arrow" style={{ borderRightWidth: '7px', borderRightStyle: 'solid', borderRightColor: 'rgb(35, 38, 49)' }}></div>
        <div>
            <h3 className=" text-24px font-bold">Hcl Tech</h3>
            <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
                
            </div>
            <p className="text-secondary text-16px font-semibold" style={{ margin: 0 }}></p>
        </div>
        <ul className="mt-5 list-disc ml-5 space-y-2">
        <li className="text-white-100 text-14px pl-1 tracking-wider">Managed and executed complex data analytics projects, focusing on improving business intelligence and operational effectiveness for HCL Tech clients.</li>
<li className="text-white-100 text-14px pl-1 tracking-wider">Designed and developed customized dashboards and reports to deliver actionable insights and support data-driven decision-making.</li>
<li className="text-white-100 text-14px pl-1 tracking-wider">Analyzed business processes and identified opportunities for optimization, leading to enhanced operational efficiency and strategic outcomes.</li>
<li className="text-white-100 text-14px pl-1 tracking-wider">Collaborated with stakeholders to tailor data solutions to specific business needs, ensuring alignment with client objectives and requirements.</li>
<li className="text-white-100 text-14px pl-1 tracking-wider">Provided ongoing support and insights to clients, facilitating the effective use of data tools and driving continuous improvements in business strategies.</li>
        </ul>
        <span className="timeline-element-date">June 2019 - August 2022</span>
    </div>
  </div>
  
  

</div>
</div>




</div>


<div data-aos="fade-up">
<h2 className=" font-bold"> Education</h2>
</div>
    <div>
    <div data-aos="fade-up-right" data-aos-duration="3000">
    <div className="timeline">
  <div className="timeline-element left">
    <span className="timeline-element-icon bounce-in" style={{ background: 'rgb(56, 62, 86)' }}>
        <div className="flex justify-center items-center w-full h-full">
          
        </div>
    </span>
    <div className="timeline-element-content bounce-in" style={{ background: 'hsl(185, 77%, 86%)', color: '#334155' }}>
        <div className="timeline-element-content-arrow" style={{ borderRightWidth: '7px', borderRightStyle: 'solid', borderRightColor: 'rgb(35, 38, 49)' }}></div>
        <div>
            <h3 className=" text-24px font-bold">University of Dayton</h3>
            <h9 className=" text-4px font-semibold">Masters in Computer Science.</h9>
            <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
                
            </div>
            <p className="text-secondary text-16px font-semibold" style={{ margin: 0 }}></p>
        </div>
        <ul className="mt-5 list-disc ml-5 space-y-2">
        </ul>
        <span className="timeline-element-date">August 2022 - May 2024</span>
    </div>
  </div>
  
  

</div>
</div>
<div data-aos="fade-up-left" data-aos-duration="3000">
<div className="timeline">
  <div className="timeline-element right">
    <span className="timeline-element-icon bounce-in" style={{ background: 'rgb(56, 62, 86)' }}>
        <div className="flex justify-center items-center w-full h-full">
          
        </div>
    </span>
    <div className="timeline-element-content bounce-in" style={{ background: 'hsl(185, 77%, 86%)', color: '#334155' }}>
        <div className="timeline-element-content-arrow" style={{ borderRightWidth: '7px', borderRightStyle: 'solid', borderRightColor: 'rgb(35, 38, 49)' }}></div>
        <div>
            <h3 className=" text-24px font-bold">ICFAI Foundation For Higher Education</h3>
            <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
                
            </div>
            <p className="text-secondary text-16px font-semibold" style={{ margin: 0 }}></p>
        </div>
        <ul className="mt-5 list-disc ml-5 space-y-2">
            <li className="text-white-100 text-14px pl-1 tracking-wider">Codeforces is a great platform for building problem-solving skills and practicing coding questions. It has various language tracks that we can complete to earn stars and showcase our proficiency in that language. I've solved 100+ questions on Codeforces, and it was the first platform I used to start my competitive programming journey. I have the highest rating of 1031.</li>
        </ul>
        <span className="timeline-element-date">August 2016 - September 2020</span>
    </div>
  </div>
  
  

</div>
</div>




</div>

</div>
<br/>
<br/>
<br/>
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '55vh', backgroundColor: 'rgb(240, 240, 240)' }}>

<Heatmap className="  font-semibold"/>
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
