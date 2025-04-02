import React from 'react';

const Brands = () => {
  const brands = [
    {
      name: "Sony",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Sony_logo.svg",
      bgColor: "bg-gray-50",
      hoverColor: "hover:bg-gray-100"
    },
    {
      name: "Dell",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/82/Dell_Logo.png",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100"
    },
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
      bgColor: "bg-gray-50",
      hoverColor: "hover:bg-gray-100"
    },
    {
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
      bgColor: "bg-gray-50",
      hoverColor: "hover:bg-gray-100"
    },
    {
      name: "Samsung",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Trusted by Leading Brands</h2>
        <p className="mt-4 text-lg text-gray-600">We partner with the world's top technology companies</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {brands.map((brand, index) => (
          <div
            key={index}
            className={`
              ${brand.bgColor} 
              ${brand.hoverColor} 
              rounded-2xl 
              p-8 
              flex 
              items-center 
              justify-center 
              transition-all 
              duration-300 
              transform 
              hover:scale-105 
              hover:shadow-lg
              group
            `}
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-12 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500">
          And many more industry leaders trust our platform
        </p>
      </div>
    </div>
  );
};

export default Brands; 