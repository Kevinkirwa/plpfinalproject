import React from 'react';
import { FiTruck, FiGift, FiDollarSign, FiShield } from 'react-icons/fi';

const Features = () => {
  const features = [
    {
      icon: <FiTruck className="w-8 h-8" />,
      title: "Free Shipping",
      description: "From all orders over $100",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      hoverColor: "hover:bg-blue-100"
    },
    {
      icon: <FiGift className="w-8 h-8" />,
      title: "Daily Surprise Offers",
      description: "Save up to 25% off",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      hoverColor: "hover:bg-purple-100"
    },
    {
      icon: <FiDollarSign className="w-8 h-8" />,
      title: "Affortable Prices",
      description: "Get Factory direct price",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      hoverColor: "hover:bg-green-100"
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Secure Payments",
      description: "100% protected payments",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      hoverColor: "hover:bg-orange-100"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`${feature.bgColor} ${feature.hoverColor} rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
          >
            <div className="flex items-center space-x-4">
              <div className={`${feature.iconColor} p-3 rounded-full ${feature.bgColor}`}>
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features; 