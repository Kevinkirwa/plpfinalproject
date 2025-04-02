import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  {
    title: "Home",
    url: "/",
    id: 1
  },
  {
    title: "Best Selling",
    url: "/best-selling",
    id: 2
  },
  {
    title: "Products",
    url: "/products",
    id: 3
  },
  {
    title: "Events",
    url: "/events",
    id: 4
  },
  {
    title: "FAQ",
    url: "/faq",
    id: 5
  },
  {
    title: "Contact Us",
    url: "/contact",
    id: 6
  }
];

const Navbar = ({ active }) => {
  return (
    <div className="flex items-center gap-8">
      {navItems.map((item) => (
        <Link key={item.id} to={item.url}>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className={`text-sm font-medium ${
              active === item.id
                ? "text-indigo-600 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600"
                : "text-gray-600 hover:text-indigo-600"
            } transition-colors duration-200`}
          >
            {item.title}
          </motion.span>
        </Link>
      ))}
    </div>
  );
};

export default Navbar;