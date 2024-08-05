import React, { useState,useEffect,useCallback ,Suspense} from 'react';
import './App.css';
import AboutView from './about';
import animation1 from './ihtyN22VL9.json' 
import AOS from 'aos';
import PortfolioCard from './login'

import { Element } from 'react-scroll';

import gsap from 'gsap'
import anime from 'animejs';

import 'bootstrap/dist/css/bootstrap.min.css';



import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';







 



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


  

 
  
  
  return (
    <div className="gradient-background">
      
      
    
       
    <div className="intro-container" style={{ marginTop: '7rem' }}>
      <h1 className="intro-heading" data-aos="fade-up"
        data-aos-duration="1000">Hi, I am Ram</h1>
      <p 
        data-aos="fade-up"
        data-aos-duration="2500"
        className="intro-text"
        style={{ color:'#6A6A6A',fontSize: '16px', fontWeight: 'bold', marginTop: '5rem', marginBottom: '0' }}

      >
Hello ! I'm Ram Kiran Meduri, a data analyst with four years of experience transforming raw data into actionable insights that drive decision-making and improve outcomes.

My expertise lies in leveraging SQL, Python, and R to extract, analyze, and model data from diverse sources. I'm also proficient in creating interactive dashboards and visualizations using tools like Tableau and Power BI to communicate findings effectively. I have hands-on experience with cloud platforms like AWS and Azure, utilizing their capabilities for scalable data storage and processing      </p>
     
   
    
   


    </div>

      
    <br/>
    <br/>
    
    
<div className="global">


      <br />
      <div data-aos="fade-up">
        <h2 className="font-bold" style={{marginTop:'4rem'}}>Work Experience</h2>
      </div>

      <VerticalTimeline>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          
          date={<span style={{ color: 'black', fontSize:'20px', fontWeight:700, textTransform:'capitalize' }}>June 2023 - present</span>}
          icon={<img src="https://static.stocktitan.net/company-logo/cah-lg.webp" alt="Cardinal Health Logo" style={{ width: '60px', height: '60px', borderRadius: '50%' }} />}
          iconStyle={{ background: 'black', boxShadow: 'none' }} // Remove default styling if needed
        
          contentStyle={{ background: 'rgb(197, 47, 33)', color: '#F2F0EC' ,borderRadius: '10px'}}
        >
          <h3 className="text-24px font-bold">Cardinal Health</h3>
          <ul className="mt-5 list-disc space-y-2" >
            <li className="text-white-100 text-14px pl-1 tracking-wider">Led the design and implementation of a data analysis system to enhance Cardinal Health’s supply chain efficiency and inventory management.</li>
            <li className="text-white-100 text-14px pl-1 tracking-wider">Developed advanced data models and dashboards to provide actionable insights into inventory levels and supply chain operations.</li>
            <li className="text-white-100 text-14px pl-1 tracking-wider">Utilized data-driven strategies to optimize inventory management, reducing operational costs and improving resource allocation.</li>
            <li className="text-white-100 text-14px pl-1 tracking-wider">Collaborated with supply chain and IT teams to integrate data analysis tools into existing workflows, streamlining processes and enhancing performance.</li>
            <li className="text-white-100 text-14px pl-1 tracking-wider">Monitored key performance metrics and adjusted strategies based on data insights to ensure continuous improvement in supply chain operations.</li>
          </ul>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          
          date={<span style={{ color: 'black', fontSize:'20px', fontWeight:700, textTransform:'capitalize' }}>June 2019 - August 2022</span>}
          icon={<img src="https://www.financialexpress.com/wp-content/uploads/2022/09/hcl1.jpg" alt="Hcl Tech Logo" style={{ width: '60px', height: '60px', borderRadius: '50%' }} />}

          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          contentStyle={{ background: 'rgb(82, 78, 210)', color: '#F2F0EC', borderRadius: '10px'}}
        >
          <h3 className="text-24px font-bold">HCL Tech</h3>
          <ul className="mt-5 list-disc  space-y-2">
            <li className="text-white-100 text-14px pl-1 tracking-wider">Managed and executed complex data analytics projects, focusing on improving business intelligence and operational effectiveness for HCL Tech clients.</li>
            <li className="text-white-100 text-14px pl-1 tracking-wider">Designed and developed customized dashboards and reports to deliver actionable insights and support data-driven decision-making.</li>
            <li className="text-white-100 text-14px pl-1 tracking-wider">Analyzed business processes and identified opportunities for optimization, leading to enhanced operational efficiency and strategic outcomes.</li>
            <li className="text-white-100 text-14px pl-1 tracking-wider">Collaborated with stakeholders to tailor data solutions to specific business needs, ensuring alignment with client objectives and requirements.</li>
            <li className="text-white-100 text-14px pl-1 tracking-wider">Provided ongoing support and insights to clients, facilitating the effective use of data tools and driving continuous improvements in business strategies.</li>
          </ul>
        </VerticalTimelineElement>
        <br/>
      
        <div data-aos="fade-up">
          <h2 className="font-bold">Education</h2>
        </div>

        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          
          date={<span style={{ color: 'black', fontSize:'20px', fontWeight:700, textTransform:'capitalize' }}>August 2022 - May 2024</span>}
          icon={<img src="https://i.pinimg.com/736x/58/a0/ab/58a0ab51494a06d105c5ae586d3eb0bc.jpg" alt="University of Dayton" style={{ width: '60px', height: '60px', borderRadius: '50%' }} />}

          iconStyle={{ background: 'rgb(15, 45, 112)', color: 'black' }}
          contentStyle={{ background: 'rgb(15, 45, 112)', color: '#F2F0EC' ,borderRadius: '15px'}}
        >
          <h3 className="text-24px font-bold">University of Dayton</h3>
          <p className="text-white-100 text-14px pl-1 tracking-wider" style={{textAlign:'center'}}>Masters in Computer Science</p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          
          date={<span style={{ color: 'black', fontSize:'20px', fontWeight:700, textTransform:'capitalize' }}>August 2016 - September 2020</span>}
          icon={<img src="https://pbs.twimg.com/profile_images/1187669264494317571/ZRkF_uzG_400x400.jpg" alt="University of Dayton" style={{ width: '60px', height: '60px', borderRadius: '50%' }} />}

          iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
          contentStyle={{ background: 'rgb(29, 89, 208)', color: '#F2F0EC' ,borderRadius: '15px'}}
        >
          <h3 className="text-24px font-bold">ICFAI Foundation For Higher Education</h3>
          <p className="text-white-100 text-14px pl-1 tracking-wider" style={{textAlign:'center'}}>Bachelor's in Computer Science</p>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
   



<br/>
<br/>
<br/>
<div className='project-heading'><h1 className="font-bold" >Projects</h1></div>
<div className='project-section'>
<PortfolioCard/>

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
