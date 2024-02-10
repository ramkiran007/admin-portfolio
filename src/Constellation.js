import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

const LottieAnimation = ({ animationData, height, width }) => {
  const animationContainer = useRef(null);

  useEffect(() => {
    let animationInstance = null;
    // Delay loading and playing the animation
    const loadDelay = setTimeout(() => {
      animationInstance = lottie.loadAnimation({
        container: animationContainer.current, // the DOM element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData, // the path to the animation json
      });
    }, 1000); // Delay in milliseconds before loading the animation

    return () => {
      clearTimeout(loadDelay); // Clear the timeout if the component unmounts
      if (animationInstance) {
        animationInstance.destroy(); // Destroy the animation instance to clean up resources
      }
    };
  }, [animationData]); // Re-run this effect if animationData changes

  return <div ref={animationContainer} style={{ height, width }} />;
};

export default LottieAnimation;
