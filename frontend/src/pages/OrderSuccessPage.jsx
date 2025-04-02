import React from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Lottie from "lottie-react";
import animationData from "../Assests/animations/107043-success.json";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  console.log("Success animation data:", animationData);
  
  if (!animationData) {
    console.error("Animation data is undefined");
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        <p className="mt-4 text-lg">Order placed successfully!</p>
      </div>
    );
  }

  try {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Lottie
          animationData={animationData}
          loop={true}
          style={{ width: 300, height: 300 }}
          autoplay={true}
        />
        <p className="mt-4 text-lg">Order placed successfully!</p>
      </div>
    );
  } catch (error) {
    console.error("Error rendering Lottie animation:", error);
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        <p className="mt-4 text-lg">Order placed successfully!</p>
      </div>
    );
  }
};

export default OrderSuccessPage;
