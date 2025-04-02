import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] bg-gradient-to-b from-white to-gray-50">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 -left-4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Left Section - Text Content */}
          <div className="lg:w-1/2 space-y-8">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Discover Unique
              <span className="block text-[#3321c8] mt-2">
                Home Decor
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-xl leading-relaxed">
              Transform your living space with our curated collection of modern home decor.
              Find unique pieces that reflect your style and create the perfect atmosphere.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <button className="px-8 py-4 bg-[#3321c8] text-white font-medium rounded-full hover:bg-[#2a1ba6] hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                    Shop Now
                </button>
              </Link>
              <Link to="/categories">
                <button className="px-8 py-4 bg-white text-gray-800 font-medium rounded-full border-2 border-gray-200 hover:border-[#3321c8] hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                  Explore Categories
                </button>
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <svg className="w-6 h-6 text-[#3321c8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Free Shipping</h3>
                  <p className="text-sm text-gray-500">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <svg className="w-6 h-6 text-[#3321c8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Secure Payment</h3>
                  <p className="text-sm text-gray-500">100% secure checkout</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <svg className="w-6 h-6 text-[#3321c8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Fast Delivery</h3>
                  <p className="text-sm text-gray-500">Within 24 Hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="lg:w-1/2">
            <div className="relative">
              {/* Background Shape */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#3321c8]/10 to-purple-50 rounded-3xl transform rotate-6"></div>
              
              {/* Main Image */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-w-4 aspect-h-3">
                  <img
                    src="https://images.pexels.com/photos/5825527/pexels-photo-5825527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Modern home decoration"
                    className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Stats Card */}
              <div className="absolute -top-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                <p className="text-3xl font-bold text-[#3321c8]">50k+</p>
                <p className="text-sm text-gray-500">Happy Customers</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
