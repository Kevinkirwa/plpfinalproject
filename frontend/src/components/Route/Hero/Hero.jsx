import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Content Section */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6 animate-fade-in">
              Discover Unique
              <span className="block text-[#3321c8] mt-2">
                Home Decor
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl animate-fade-in-up">
              Transform your living space with our curated collection of modern home decor.
              Find unique pieces that reflect your style and create the perfect atmosphere.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12">
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

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto lg:mx-0">
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <svg className="w-6 h-6 text-[#3321c8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Free Shipping</h3>
                  <p className="text-sm text-gray-500">On orders over KES 10,000</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="p-2 bg-purple-50 rounded-lg">
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

          {/* Image Section */}
          <div className="flex-1 relative z-0">
            <div className="relative z-0 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img
                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
                alt="Modern home decoration"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          </div>
        </div>
      </div>

      {/* Add some custom animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in 1s ease-out 0.3s backwards;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default Hero;
