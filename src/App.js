import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Routes, Route } from 'react-router-dom';
import UserView from './user';
import AdminView from './admin';
import AboutView from './about';
import NavbarComponent from './navbar';
import Component from './footer';

function App() {

  const [portfolioDetails, setPortfolioDetails] = useState({
    image: null,
    projects: [],
    workExperiences: [],
    about: []
  });
  const [isUserViewActive, setIsUserViewActive] = useState(false);
  const [currentTab, setCurrentTab] = useState('home');
  const location = useLocation();
  const [transitionClass, setTransitionClass] = useState('fade-enter');


  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'projects', // default
    image: null,
    resume: null,
  });
  useEffect(() => {
    fetchPortfolioDetails();
  }, []);


  useEffect(() => {
    setTransitionClass('fade-enter-active');
  }, [location]);

  useEffect(() => {
    // Set isUserViewActive based on the current path
    setIsUserViewActive(location.pathname === '/');
  }, [location]);


   const fetchPortfolioDetails = async () => {
    try {
      const response = await fetch('https://ramkiranmeduri.netlify.app/api/portfolio/items');
      if (response.ok) {
        const items = await response.json();
        console.log('all items'+JSON.stringify(items[0]))
        
        // Initialize categorizedData with placeholders for the latest image and resume
        const categorizedData = {
          projects: [],
          workExperiences: [],
          about: [],
          image: null,
          resume: null
        };
  
        // Use these to track the latest timestamps
        let latestImageDate = 0;
        let latestResumeDate = 0;
  
        items.forEach(item => {
         
          // Populate projects, work experiences, and about sections
          if (item.type) {
            switch (item.type) {
              case 'project':
              case 'projects':
                categorizedData.projects.push(item);
                break;
              case 'workExperience':
              case 'workExperiences':
                categorizedData.workExperiences.push(item);
                break;
              case 'about':
                categorizedData.about.push(item);
                break;
              default:
                
                console.warn(`Unhandled item type: ${item.type}`);
                break;
            }
          }
  
          // Update the image and resume with the latest one based on updatedAt or createdAt timestamp
          if (item.image) {
            
            const imageDate = new Date(item.updatedAt || item.createdAt).getTime();

            if (imageDate > latestImageDate) {
              categorizedData.image = item.image;
             console.log('if catimage'+categorizedData.image.slice('/uploads'.length))

              latestImageDate = imageDate;
            }
          }
  
          if (item.resume) {
            const resumeDate = new Date(item.updatedAt || item.createdAt).getTime();
            if (resumeDate > latestResumeDate) {
              categorizedData.resume = item.resume;
              
              latestResumeDate = resumeDate;
            }
          }
        });
  
        setPortfolioDetails(categorizedData);
      } else {
        console.error('Failed to fetch portfolio details');
      }
    } catch (error) {
      console.error('Error fetching portfolio details:', error);
    }
  };
  
  

  

  // Inside AdminView component, adjust the file input change handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    
    if (!file) {
        console.log("No file selected.");
        return;
    }

    // Immediate preview
    const imageUrl = URL.createObjectURL(file);;
   // console.log(imageUrl)
    //setPortfolioDetails(prev => ({ ...prev, image: file }));
   setPortfolioDetails(prev => ({ ...prev, image: file }));  // Save the file to formData


    // Prepare formData for upload
    const formData = new FormData();
    formData.append('image', file); // Adjust 'image' if your API expects a different key

    try {
        const response = await fetch('https://ramkiranmeduri.netlify.app/api/portfolio/add', {
            method: 'POST',
            body: formData, // Send formData directly
            // headers not needed, browser will set Content-Type to multipart/form-data with boundary

        });
        console.log('imagepath response'+JSON.stringify(response))

        if (response.ok) {
            const result = await response.json();
            console.log('Upload successful', result);
            // Optionally update state with server response, e.g., storing the file's path as returned from the server
            // This step is optional and depends on whether you need to reference the server-stored image immediately
            
            setPortfolioDetails(prev => ({ ...prev, image: `/uploads/${result.imagePath}` }));
            URL.revokeObjectURL(imageUrl);
        } else {
            console.error('Upload failed');
        }
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}

  
  

const handleResumeUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) {
    console.log("No file selected.");
    return;
  }

  // There's usually no need for an immediate preview for resumes like images, 
  // but if you have a UI element to indicate a file is selected, update it here.

  // Prepare formData for upload
  const formData = new FormData();
  formData.append('resume', file); // Adjust 'resume' if your API expects a different key

  try {
    const response = await fetch('https://ramkiranmeduri.netlify.app/api/portfolio/add', { // Make sure this URL is correct for your API
      method: 'POST',
      body: formData, // Send formData directly
      // headers not needed, the browser will set Content-Type to multipart/form-data with boundary
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Resume upload successful', result);
      // Update state with server response, e.g., storing the resume's path as returned from the server
      // This might involve updating a path in your state where the resume URL is stored
      setPortfolioDetails(prev => ({ ...prev, resume: `/uploads/${result.resumePath}` })); // Adjust according to how you're storing this in state
    } else {
      console.error('Resume upload failed');
    }
  } catch (error) {
    console.error('Error uploading resume:', error);
  }
};

/*
  const handleAddDetail = (detail, type) => {
    const updatedDetails = { ...portfolioDetails };
    if (type === 'projects' && updatedDetails.projects.some(project => project.title === detail.title)) {
      alert('A project with this title already exists.');
      return;
    }
    setPortfolioDetails(prevState => {
      const newDetails = { ...prevState };
      newDetails[type].push(detail);
      return newDetails;
    });
  };
  */
/*
  const handleRemoveProject = (titleToRemove) => {
    const updatedProjects = portfolioDetails.projects.filter(project => project.title !== titleToRemove);
    setPortfolioDetails(prev => ({ ...prev, projects: updatedProjects }));
  };

  const handleRemoveExperience = (titleToRemove) => {
    const updatedExperiences = portfolioDetails.workExperiences.filter(experience => experience.title !== titleToRemove);
    setPortfolioDetails(prev => ({ ...prev, workExperiences: updatedExperiences }));
  };
  */
  const handleRemoveAbout = (titleToRemove) => {
    const updatedAbout = portfolioDetails.about.filter(abt => abt.title !== titleToRemove);
    setPortfolioDetails(prev => ({ ...prev, about: updatedAbout }));
  };
  

  // Assuming you have a way to determine the specific ID of the item whose image you want to delete
  const handleRemoveImage = async () => {
    if (!portfolioDetails.image) return; // Ensure there is an image to remove

    try {
        const response = await fetch('https://ramkiranmeduri.netlify.app/remove-image', {
            method: 'POST', // Using POST or DELETE with body, depending on your API design
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imagePath: portfolioDetails.image }),
        });

        if (response.ok) {
            // Successfully removed the image, now update UI accordingly
            alert('Profile image removed successfully');
            // Update local state or re-fetch portfolio details
            setPortfolioDetails(prevState => ({ ...prevState, image: null }));
        } else {
            console.error('Failed to remove profile image');
        }
    } catch (error) {
        console.error('Error removing profile image:', error);
    }
};


  

 
 

  return (
    <div className={`transition-container ${transitionClass}`}>
      <NavbarComponent currentTab={currentTab} setCurrentTab={setCurrentTab} portfolioDetails={portfolioDetails} />
      <TransitionGroup>
        <CSSTransition timeout={300} classNames="page" key={location.key}>
          <Routes>
            <Route path="/" element={<UserView portfolioDetails={portfolioDetails} isUserViewActive={isUserViewActive} />} />
            <Route path="/admin" element={<AdminView fetchPortfolioDetails={fetchPortfolioDetails} onRemoveAbout={handleRemoveAbout} handleResumeUpload={handleResumeUpload} portfolioDetails={portfolioDetails} handleImageUpload={handleImageUpload} formData={formData} setFormData={setFormData} handleRemoveImage={handleRemoveImage}/>} />
            <Route path="/about" element={<AboutView portfolioDetails={portfolioDetails}   />} />

          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <Component/>
    </div>
  );
}

export default React.memo(App);
