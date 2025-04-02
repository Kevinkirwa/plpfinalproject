import React from "react";
import Lottie from "lottie-react";
import animationData from "../../Assests/animations/24151-ecommerce-animation.json";

const Loader = () => {
  if (!animationData) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

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
};

export default Loader;
