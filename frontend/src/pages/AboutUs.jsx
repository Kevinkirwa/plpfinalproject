import React from 'react';

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'John Doe',
      role: 'CEO & Founder',
      image: '/images/team/team1.jpg',
      bio: 'Visionary leader with over 10 years of e-commerce experience.'
    },
    {
      name: 'Jane Smith',
      role: 'Operations Director',
      image: '/images/team/team2.jpg',
      bio: 'Expert in supply chain management and customer satisfaction.'
    },
    {
      name: 'David Wilson',
      role: 'Technical Lead',
      image: '/images/team/team3.jpg',
      bio: 'Full-stack developer with a passion for user experience.'
    },
    {
      name: 'Sarah Johnson',
      role: 'Customer Success Manager',
      image: '/images/team/team4.jpg',
      bio: 'Dedicated to ensuring the best experience for our customers.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About KartHub</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering local businesses and connecting them with customers across Kenya.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-4">
              Founded in 2024, KartHub emerged from a vision to transform how local businesses connect with customers in Kenya. 
              We recognized the need for a platform that would make online selling accessible to everyone, from small shop owners 
              to large retailers.
            </p>
            <p className="mb-4">
              What started as a simple idea has grown into Kenya's leading e-commerce platform, serving thousands of sellers 
              and customers across the country. Our journey has been driven by our commitment to innovation, reliability, 
              and customer satisfaction.
            </p>
            <p>
              Today, we're proud to be contributing to Kenya's digital economy, helping businesses grow, and making shopping 
              more convenient for our customers.
            </p>
          </div>
        </div>

        {/* Mission & Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Mission */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To empower local businesses with digital tools and connect them with customers across Kenya, 
              while providing shoppers with a convenient, reliable, and secure shopping experience.
            </p>
          </div>

          {/* Values */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <span className="font-semibold mr-2">Customer First:</span>
                Everything we do is focused on providing the best experience for our users.
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Trust & Transparency:</span>
                We believe in building lasting relationships through honest practices.
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Innovation:</span>
                We continuously evolve to meet the changing needs of our community.
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Community:</span>
                We're committed to supporting local businesses and the Kenyan economy.
              </li>
            </ul>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150';
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-indigo-600 mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 