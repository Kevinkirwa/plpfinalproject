import React from "react";
import Lottie from "lottie-react";
import animationData from "../../Assests/animations/24151-ecommerce-animation.json";

const Loader = () => {
  console.log("Loader animation data:", animationData);
  
  if (!animationData) {
    console.error("Animation data is undefined");
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  try {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Lottie 
          animationData={animationData} 
          loop={true}
          style={{ width: 300, height: 300 }}
          autoplay={true}
        />
      </div>
    );
  } catch (error) {
    console.error("Error rendering Lottie animation:", error);
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
};

export default Loader;
