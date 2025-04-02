import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const Careers = () => {
  const jobOpenings = [
    {
      title: 'Senior Frontend Developer',
      location: 'Nairobi, Kenya',
      type: 'Full-time',
      experience: '5+ years',
      description: 'We are looking for an experienced Frontend Developer to join our team and help build amazing user experiences.',
      requirements: [
        'Strong experience with React and modern JavaScript',
        'Experience with responsive design and mobile-first approaches',
        'Knowledge of modern frontend build tools',
        'Excellent problem-solving skills'
      ]
    },
    {
      title: 'Product Manager',
      location: 'Nairobi, Kenya',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Join us as a Product Manager to help shape the future of e-commerce in Kenya.',
      requirements: [
        'Experience in product management for web applications',
        'Strong analytical and problem-solving skills',
        'Excellent communication and leadership abilities',
        'Understanding of e-commerce platforms'
      ]
    },
    {
      title: 'Customer Success Manager',
      location: 'Nairobi, Kenya',
      type: 'Full-time',
      experience: '2+ years',
      description: 'Help our customers succeed by providing exceptional support and guidance.',
      requirements: [
        'Previous experience in customer success or account management',
        'Strong communication and interpersonal skills',
        'Problem-solving mindset',
        'Experience with CRM software'
      ]
    }
  ];

  const benefits = [
    'Competitive salary and equity options',
    'Health insurance for you and your family',
    'Flexible working hours and remote work options',
    'Professional development opportunities',
    'Modern office in prime location',
    'Team building events and activities',
    'Annual leave and paid time off',
    'Performance bonuses'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Help us transform e-commerce in Kenya. We're looking for talented individuals who are passionate about innovation and customer success.
          </p>
        </div>

        {/* Why Join Us Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Work With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <AiOutlineCheckCircle className="text-green-500 text-xl flex-shrink-0 mt-1" />
                <span className="text-gray-600">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Open Positions</h2>
          <div className="space-y-6">
            {jobOpenings.map((job, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-wrap justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    <div className="mt-2 space-x-4">
                      <span className="text-gray-600">{job.location}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-600">{job.type}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-600">{job.experience}</span>
                    </div>
                  </div>
                  <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                    Apply Now
                  </button>
                </div>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {job.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Process */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Application Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Submit Application</h3>
              <p className="text-gray-600">Fill out the application form and attach your resume</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Initial Review</h3>
              <p className="text-gray-600">Our team will review your application and qualifications</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Interview Process</h3>
              <p className="text-gray-600">Selected candidates will be invited for interviews</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers; 