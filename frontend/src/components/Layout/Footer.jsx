import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillFacebook, AiFillInstagram, AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";
import { footerProductLinks, footerSupportLinks, footercompanyLinks } from "../../static/data";
import logo from '../../assets/logo.png';

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail("");
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Newsletter Section */}
      <div className="relative overflow-hidden bg-indigo-600 py-16">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-20">
          <svg viewBox="0 0 400 400" className="h-96 w-96 text-indigo-500">
            <defs>
              <pattern id="lines" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 0 10 L 20 10 M 10 0 L 10 20" stroke="currentColor" strokeWidth="1" fill="none"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#lines)"/>
          </svg>
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Subscribe to Our Newsletter
              </h2>
              <p className="mt-4 text-lg text-indigo-100">
                Get the latest updates on new products and upcoming sales.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="mt-10 max-w-md mx-auto">
              <div className="flex gap-x-4">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-w-0 flex-auto rounded-full border-0 bg-white/10 px-6 py-4 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-indigo-100 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="flex-none rounded-full bg-white py-4 px-8 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-200"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="bg-white border-t">
        <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div>
              <div className="mb-4">
                <Link to="/">
                  <img
                    src={logo}
                    alt="KartHub Logo"
                    className="h-12 w-auto"
                  />
                </Link>
              </div>
              <p className="text-gray-600 text-sm">
                The home and elements needed to create beautiful products.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-200">
                  <AiFillFacebook size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors duration-200">
                  <AiFillInstagram size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors duration-200">
                  <AiFillYoutube size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  <AiOutlineTwitter size={24} />
                </a>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                {footercompanyLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.link} className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shop Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Shop
              </h3>
              <ul className="space-y-3">
                {footerProductLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.link} className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Support
              </h3>
              <ul className="space-y-3">
                {footerSupportLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.link} className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex justify-center items-center">
              <div className="text-center text-gray-500 text-sm">
                © 2024 KartHub. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
