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
  if (!animationData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        <h5 className="text-center mt-4 text-[25px] text-[#000000a1]">
          Your order is successful 😍
        </h5>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Lottie 
        animationData={animationData} 
        loop={false}
        style={{ width: 300, height: 300 }}
        autoplay={true}
      />
      <h5 className="text-center mt-4 text-[25px] text-[#000000a1]">
        Your order is successful 😍
      </h5>
    </div>
  );
};

export default OrderSuccessPage;
