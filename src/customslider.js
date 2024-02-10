import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function CustomSlider({ portfolioDetails }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    afterChange: (current) => setCurrentSlide(current),
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {portfolioDetails.projects.map((project, index) => (
          <div key={project.title}>
            
            <div className="project-description">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </Slider>
      <div className="transition-dots">
        {portfolioDetails.projects.map((project, index) => (
          <span
            key={project.title}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default CustomSlider;
