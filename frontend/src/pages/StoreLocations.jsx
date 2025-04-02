import React from 'react';
import { AiOutlinePhone, AiOutlineMail, AiOutlineClockCircle } from 'react-icons/ai';

const StoreLocations = () => {
  const stores = [
    {
      name: 'Nairobi Main Store',
      address: '123 Kimathi Street, CBD, Nairobi',
      phone: '+254 712 345 678',
      email: 'nairobi@karthub.com',
      hours: {
        weekdays: '9:00 AM - 6:00 PM',
        saturday: '9:00 AM - 4:00 PM',
        sunday: 'Closed'
      },
      services: ['In-store pickup', 'Returns processing', 'Product demonstrations'],
      coordinates: '-1.2921,36.8219'
    },
    {
      name: 'Mombasa Branch',
      address: '45 Moi Avenue, Mombasa',
      phone: '+254 712 345 679',
      email: 'mombasa@karthub.com',
      hours: {
        weekdays: '9:00 AM - 6:00 PM',
        saturday: '9:00 AM - 4:00 PM',
        sunday: 'Closed'
      },
      services: ['In-store pickup', 'Returns processing', 'Customer support'],
      coordinates: '-4.0435,39.6682'
    },
    {
      name: 'Kisumu Branch',
      address: '78 Oginga Odinga Street, Kisumu',
      phone: '+254 712 345 680',
      email: 'kisumu@karthub.com',
      hours: {
        weekdays: '9:00 AM - 6:00 PM',
        saturday: '9:00 AM - 4:00 PM',
        sunday: 'Closed'
      },
      services: ['In-store pickup', 'Returns processing', 'Product demonstrations'],
      coordinates: '-0.1022,34.7617'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Store Locations</h1>
          <p className="text-xl text-gray-600">
            Visit us at one of our stores across Kenya for in-person shopping and support.
          </p>
        </div>

        {/* Store Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {stores.map((store, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{store.name}</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Address</h3>
                  <p className="text-gray-600">{store.address}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Contact</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <AiOutlinePhone className="text-indigo-600" />
                      <span>{store.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <AiOutlineMail className="text-indigo-600" />
                      <span>{store.email}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Hours</h3>
                  <div className="space-y-1 text-gray-600">
                    <div className="flex items-center space-x-2">
                      <AiOutlineClockCircle className="text-indigo-600" />
                      <div>
                        <p>Monday - Friday: {store.hours.weekdays}</p>
                        <p>Saturday: {store.hours.saturday}</p>
                        <p>Sunday: {store.hours.sunday}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Services</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {store.services.map((service, idx) => (
                      <li key={idx} className="text-gray-600">{service}</li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${store.coordinates}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
                >
                  Get Directions
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Find Us on the Map</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              title="Store Locations"
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps/embed/v1/search?q=Kenya&key=YOUR_GOOGLE_MAPS_API_KEY`}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreLocations; 