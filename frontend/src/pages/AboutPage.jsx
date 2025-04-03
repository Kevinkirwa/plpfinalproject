import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const AboutPage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              About KartHub
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
              Your one-stop marketplace for all your shopping needs.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Our Mission</h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>
                      At KartHub, our mission is to connect buyers and sellers in a seamless, 
                      secure, and enjoyable shopping experience. We strive to provide a platform 
                      where quality products meet discerning customers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Our Vision</h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>
                      We envision KartHub as the leading e-commerce platform that empowers 
                      businesses of all sizes to reach customers globally while providing 
                      shoppers with an unparalleled selection of products and services.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Our Story</h3>
                <div className="mt-2 text-sm text-gray-500">
                  <p>
                    KartHub was founded with a simple idea: to create a marketplace that puts 
                    both buyers and sellers first. What started as a small platform has grown 
                    into a comprehensive e-commerce solution that serves millions of users.
                  </p>
                  <p className="mt-4">
                    Our journey has been marked by continuous innovation, customer feedback, 
                    and a commitment to excellence. We've introduced features like secure payments, 
                    real-time tracking, and personalized recommendations to enhance the shopping experience.
                  </p>
                  <p className="mt-4">
                    Today, KartHub is more than just a marketplace—it's a community of entrepreneurs, 
                    artisans, and shoppers who come together to create value for everyone.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Our Values</h3>
                <div className="mt-2 text-sm text-gray-500">
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Customer First:</strong> We prioritize our customers' needs and satisfaction above all else.</li>
                    <li><strong>Integrity:</strong> We conduct our business with honesty, transparency, and ethical practices.</li>
                    <li><strong>Innovation:</strong> We continuously seek new ways to improve our platform and services.</li>
                    <li><strong>Community:</strong> We foster a supportive environment for both buyers and sellers.</li>
                    <li><strong>Sustainability:</strong> We are committed to reducing our environmental impact through responsible practices.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage; 