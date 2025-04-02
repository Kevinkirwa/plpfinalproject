import React from "react";
import styles from "../../styles/styles";
import { FaShoppingBag } from "react-icons/fa";
import { SiSafaricom, SiMpesa, SiEquitybank, SiCooperativebank, SiAbsabank, SiKcb, SiStandardchartered, SiSony, SiDell, SiMicrosoft, SiSamsung, SiLg, SiApple, SiHp } from "react-icons/si";
import { BsFillCreditCardFill } from "react-icons/bs";
import { MdLocalShipping } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

const Partners = () => {
  const techPartners = [
    {
      name: "Sony",
      icon: <SiSony size={50} className="text-[#000000]" />,
      description: "Leading consumer electronics"
    },
    {
      name: "Dell",
      icon: <SiDell size={50} className="text-[#007DB8]" />,
      description: "Premium computer hardware"
    },
    {
      name: "Microsoft",
      icon: <SiMicrosoft size={50} className="text-[#00A4EF]" />,
      description: "Global technology leader"
    },
    {
      name: "Samsung",
      icon: <SiSamsung size={50} className="text-[#1428A0]" />,
      description: "Innovation in electronics"
    },
    {
      name: "Apple",
      icon: <SiApple size={50} className="text-[#555555]" />,
      description: "Premium technology products"
    },
    {
      name: "HP",
      icon: <SiHp size={50} className="text-[#0096D6]" />,
      description: "Computing solutions provider"
    },
    {
      name: "LG",
      icon: <SiLg size={50} className="text-[#A50034]" />,
      description: "Life's Good with technology"
    }
  ];

  const localPartners = [
    {
      name: "Safaricom",
      icon: <SiSafaricom size={40} className="text-[#12b32a]" />,
      description: "Kenya's leading telecommunications provider"
    },
    {
      name: "M-Pesa",
      icon: <SiMpesa size={40} className="text-[#12b32a]" />,
      description: "Africa's leading mobile money service"
    },
    {
      name: "Equity Bank",
      icon: <SiEquitybank size={40} className="text-[#12b32a]" />,
      description: "Kenya's largest bank by customer base"
    },
    {
      name: "KCB Bank",
      icon: <SiKcb size={40} className="text-[#12b32a]" />,
      description: "Kenya's largest bank by assets"
    }
  ];

  const features = [
    {
      name: "Secure Payments",
      icon: <BsFillCreditCardFill size={40} className="text-[#12b32a]" />,
      description: "Multiple secure payment options"
    },
    {
      name: "Fast Delivery",
      icon: <MdLocalShipping size={40} className="text-[#12b32a]" />,
      description: "Nationwide delivery network"
    },
    {
      name: "24/7 Support",
      icon: <BiSupport size={40} className="text-[#12b32a]" />,
      description: "Round-the-clock customer support"
    },
    {
      name: "Quality Products",
      icon: <FaShoppingBag size={40} className="text-[#12b32a]" />,
      description: "Verified product quality"
    }
  ];

  return (
    <div className="w-full my-10">
      <div className="w-[95%] 800px:w-[90%] mx-auto">
        {/* Tech Partners Section */}
        <div className="text-center mb-10">
          <h1 className="text-[25px] font-[500] text-[#000000a1]">
            Global Technology Partners
          </h1>
          <p className="text-[16px] text-[#000000a1]">
            Partnering with world-class technology brands
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8 mb-16">
          {techPartners.map((partner, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-2 transform hover:scale-110 transition-transform duration-300">
                {partner.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Local Partners Section */}
        <div className="text-center mb-10">
          <h1 className="text-[25px] font-[500] text-[#000000a1]">
            Local Partners
          </h1>
          <p className="text-[16px] text-[#000000a1]">
            Working with Kenya's leading companies
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {localPartners.map((partner, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="mb-4">{partner.icon}</div>
              <h3 className="text-[18px] font-[600] text-[#000000a1] mb-2">
                {partner.name}
              </h3>
              <p className="text-[14px] text-[#000000a1] text-center">
                {partner.description}
              </p>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="text-center mb-10">
          <h1 className="text-[25px] font-[500] text-[#000000a1]">
            Why Choose Us
          </h1>
          <p className="text-[16px] text-[#000000a1]">
            We provide the best shopping experience for our customers
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-[18px] font-[600] text-[#000000a1] mb-2">
                {feature.name}
              </h3>
              <p className="text-[14px] text-[#000000a1] text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners; 