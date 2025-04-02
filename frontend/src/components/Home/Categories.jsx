import React from 'react';
import { Link } from 'react-router-dom';
import { FiMonitor, FiShoppingBag, FiSmartphone, FiHeadphones, FiGift, FiHeart } from 'react-icons/fi';
import { GiClothes, GiRunningShoe } from 'react-icons/gi';
import { MdPets } from 'react-icons/md';

const Categories = () => {
  const categories = [
    {
      icon: <FiMonitor className="w-8 h-8" />,
      title: "Computers and Laptops",
      link: "/products?category=computers",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      hoverColor: "hover:bg-blue-100"
    },
    {
      icon: <GiClothes className="w-8 h-8" />,
      title: "Clothes",
      link: "/products?category=clothes",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      hoverColor: "hover:bg-purple-100"
    },
    {
      icon: <FiSmartphone className="w-8 h-8" />,
      title: "Mobile and Tablets",
      link: "/products?category=mobile",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      hoverColor: "hover:bg-green-100"
    },
    {
      icon: <FiHeadphones className="w-8 h-8" />,
      title: "Music and Gaming",
      link: "/products?category=music",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
      hoverColor: "hover:bg-yellow-100"
    },
    {
      icon: <GiRunningShoe className="w-8 h-8" />,
      title: "Shoes",
      link: "/products?category=shoes",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      hoverColor: "hover:bg-red-100"
    },
    {
      icon: <FiShoppingBag className="w-8 h-8" />,
      title: "Accessories",
      link: "/products?category=accessories",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600",
      hoverColor: "hover:bg-indigo-100"
    },
    {
      icon: <MdPets className="w-8 h-8" />,
      title: "Pet Care",
      link: "/products?category=pet-care",
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
      hoverColor: "hover:bg-pink-100"
    },
    {
      icon: <FiGift className="w-8 h-8" />,
      title: "Gifts",
      link: "/products?category=gifts",
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600",
      hoverColor: "hover:bg-teal-100"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <Link
            to={category.link}
            key={index}
            className={`${category.bgColor} ${category.hoverColor} rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className={`${category.iconColor} p-4 rounded-full ${category.bgColor}`}>
                {category.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories; 