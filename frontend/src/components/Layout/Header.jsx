import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { categoriesData, productData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineLogin,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";
import { FiShoppingBag } from "react-icons/fi";
import axios from "axios";
import server from "../../server";
import { toast } from "react-toastify";
import logo from '../../assets/logo.png';

// Define the server URL
const SERVER_URL = "http://localhost:8000"; // or your actual server URL

const Header = ({ activeHeading }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const dispatch = useDispatch();

  // Add debug logging for authentication state
  useEffect(() => {
    console.log("Auth state in Header:", { isAuthenticated, isSeller });
  }, [isAuthenticated, isSeller]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  const handleSellerClick = () => {
    // Add safety check to ensure user is authenticated before showing dashboard
    if (isSeller && isAuthenticated) {
      return "/dashboard";
    }
    return "/shop-create";
  };

  const logoutHandler = () => {
    try {
      dispatch({ type: "LogoutRequest" });
      axios
        .get(`${server}/user/logout`, { withCredentials: true })
        .then((res) => {
          dispatch({ type: "LogoutSuccess" });
          toast.success(res.data.message);
          navigate("/login");
          window.location.reload(true);
        })
        .catch((error) => {
          console.error("Logout error:", error);
          dispatch({
            type: "LogoutFail",
            payload: error.response?.data?.message || "Logout failed"
          });
          toast.error(error.response?.data?.message || "Logout failed");
        });
    } catch (error) {
      console.error("Logout error:", error);
      dispatch({
        type: "LogoutFail",
        payload: error.message
      });
      toast.error(error.message);
    }
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className="bg-white sticky top-0 left-0 right-0 z-50">
        {/* Top Bar */}
        <div className="hidden lg:block bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-10 items-center justify-between">
              <p className="text-sm text-gray-500">
                Get free delivery on orders over $100
              </p>
              <div className="flex items-center space-x-6">
                <Link 
                  to={handleSellerClick()} 
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center"
                >
                  <FiShoppingBag className="mr-1" size={14} />
                  {isSeller ? "Seller Dashboard" : "Become a Vendor"}
                </Link>
                <Link to="/about" className="text-sm text-gray-500 hover:text-gray-600">
                  About Us
                </Link>
                <Link to="/careers" className="text-sm text-gray-500 hover:text-gray-600">
                  Careers
                </Link>
                <Link to="/locations" className="text-sm text-gray-500 hover:text-gray-600">
                  Store Locations
                </Link>
                <Link to="/blog" className="text-sm text-gray-500 hover:text-gray-600">
                  Our Blog
                </Link>
                <Link to="/faq" className="text-sm text-gray-500 hover:text-gray-600">
                  Help Center
                </Link>
                <Link to="/contact" className="text-sm text-gray-500 hover:text-gray-600">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className={`${active ? "shadow-sm" : ""} transition-all duration-300`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Mobile menu button */}
              <button
                onClick={() => setOpen(!open)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <BiMenuAltLeft size={25} />
              </button>

              {/* Logo */}
              <Link to="/" className="flex-shrink-0">
                <img
                  src={logo}
                  alt="KartHub"
                  className="h-[50px] w-auto object-contain"
                />
              </Link>

              {/* Search */}
              <div className="hidden lg:flex flex-1 max-w-2xl mx-12">
                <div className="w-full relative">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full px-4 py-2.5 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <AiOutlineSearch className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  {searchData && searchData.length !== 0 ? (
                    <div className="absolute mt-1 w-full p-2 bg-white shadow-lg rounded-lg border border-gray-200 z-[9]">
                      {searchData.map((i, index) => {
                        const imageUrl = i.images[0]?.startsWith('http') 
                          ? i.images[0] 
                          : `${SERVER_URL}${i.images[0]}`;
                        return (
                          <Link to={`/product/${i._id}`} key={index}>
                            <div className="flex items-center py-2 px-3 hover:bg-gray-50 rounded-lg">
                              <img
                                src={imageUrl}
                                alt=""
                                className="w-10 h-10 object-cover rounded-md mr-4"
                              />
                              <h5 className="text-gray-800">{i.name}</h5>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Navigation Items */}
              <div className="flex items-center space-x-6">
                {/* Wishlist */}
                <div className="relative">
                  <button
                    onClick={() => setOpenWishlist(true)}
                    className="p-2 hover:bg-gray-100 rounded-full relative"
                  >
                    <AiOutlineHeart size={25} className="text-gray-600" />
                    {wishlist && wishlist.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {wishlist.length}
                      </span>
                    )}
                  </button>
                </div>

                {/* Cart */}
                <div className="relative">
                  <button
                    onClick={() => setOpenCart(true)}
                    className="p-2 hover:bg-gray-100 rounded-full relative"
                  >
                    <AiOutlineShoppingCart size={25} className="text-gray-600" />
                    {cart && cart.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cart.length}
                      </span>
                    )}
                  </button>
                </div>

                {/* User Profile */}
                <div className="relative">
                  {isAuthenticated ? (
                    <div className="relative">
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => setUserDropdown(!userDropdown)}
                      >
                        <img
                          src={user?.avatar?.url}
                          className="w-8 h-8 rounded-full object-cover"
                          alt=""
                        />
                        <IoIosArrowDown
                          size={20}
                          className="ml-1 text-gray-600"
                        />
                      </div>
                      {/* User Dropdown Menu */}
                      {userDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setUserDropdown(false)}
                          >
                            Profile
                          </Link>
                          {user?.role === "Admin" && (
                            <Link
                              to="/admin/dashboard"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setUserDropdown(false)}
                            >
                              Admin Dashboard
                            </Link>
                          )}
                          <button
                            onClick={() => {
                              setUserDropdown(false);
                              logoutHandler();
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link to="/login">
                      <CgProfile size={25} className="text-gray-600" />
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Categories Navigation */}
            <div className="hidden lg:block border-t">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center space-x-8">
                  <div className="relative">
                    <button
                      onClick={() => setDropDown(!dropDown)}
                      className="flex items-center text-gray-700 hover:text-gray-800 font-medium"
                    >
                      <BiMenuAltLeft className="mr-2" size={20} />
                      All Categories
                      <IoIosArrowDown className="ml-1" size={20} />
                    </button>
                    {dropDown && (
                      <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-[9]">
                        <DropDown
                          categoriesData={categoriesData}
                          setDropDown={setDropDown}
                        />
                      </div>
                    )}
                  </div>
                  <Link
                    to="/"
                    className={`${
                      activeHeading === 1 ? "text-indigo-600" : "text-gray-700"
                    } hover:text-indigo-600 font-medium`}
                  >
                    Home
                  </Link>
                  <Link
                    to="/best-selling"
                    className={`${
                      activeHeading === 2 ? "text-indigo-600" : "text-gray-700"
                    } hover:text-indigo-600 font-medium`}
                  >
                    Best Selling
                  </Link>
                  <Link
                    to="/products"
                    className={`${
                      activeHeading === 3 ? "text-indigo-600" : "text-gray-700"
                    } hover:text-indigo-600 font-medium`}
                  >
                    Products
                  </Link>
                  <Link
                    to="/events"
                    className={`${
                      activeHeading === 4 ? "text-indigo-600" : "text-gray-700"
                    } hover:text-indigo-600 font-medium`}
                  >
                    Events
                  </Link>
                  <Link
                    to="/faq"
                    className={`${
                      activeHeading === 5 ? "text-indigo-600" : "text-gray-700"
                    } hover:text-indigo-600 font-medium`}
                  >
                    FAQ
                  </Link>
                  <Link
                    to="/contact"
                    className={`${
                      activeHeading === 6 ? "text-indigo-600" : "text-gray-700"
                    } hover:text-indigo-600 font-medium`}
                  >
                    Contact Us
                  </Link>
                </div>
                <Link
                  to={handleSellerClick()}
                  className="inline-flex items-center px-6 py-3 border-2 border-indigo-600 text-sm font-semibold rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 hover:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
                >
                  <FiShoppingBag className="mr-2" size={18} />
                  {isSeller ? "Go to Dashboard" : "Start Selling Today"}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden">
            <div className="fixed inset-0 z-50">
              <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setOpen(false)} />
              <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl z-50">
                <div className="h-full flex flex-col">
                  <div className="h-16 flex items-center justify-between px-4 border-b">
                    <Link to="/" className="flex-shrink-0">
                      <img
                        src={logo}
                        alt="KartHub"
                        className="h-8 w-auto"
                      />
                    </Link>
                    <button
                      onClick={() => setOpen(false)}
                      className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                    >
                      <RxCross1 size={20} />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <div className="px-4 py-6 space-y-6">
                      <div className="flow-root">
                        <Link
                          to={handleSellerClick()}
                          className="flex items-center justify-center p-4 -m-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-md"
                          onClick={() => setOpen(false)}
                        >
                          <FiShoppingBag className="mr-2" size={20} />
                          <span className="font-semibold">
                            {isSeller ? "Seller Dashboard" : "Start Your Business"}
                          </span>
                        </Link>
                      </div>
                      <div className="flow-root">
                        <Link
                          to="/"
                          className="flex items-center p-3 -m-3 hover:bg-gray-50 rounded-lg"
                          onClick={() => setOpen(false)}
                        >
                          Home
                        </Link>
                      </div>
                      <div className="flow-root">
                        <Link
                          to="/best-selling"
                          className="flex items-center p-3 -m-3 hover:bg-gray-50 rounded-lg"
                          onClick={() => setOpen(false)}
                        >
                          Best Selling
                        </Link>
                      </div>
                      <div className="flow-root">
                        <Link
                          to="/products"
                          className="flex items-center p-3 -m-3 hover:bg-gray-50 rounded-lg"
                          onClick={() => setOpen(false)}
                        >
                          Products
                        </Link>
                      </div>
                      <div className="flow-root">
                        <Link
                          to="/events"
                          className="flex items-center p-3 -m-3 hover:bg-gray-50 rounded-lg"
                          onClick={() => setOpen(false)}
                        >
                          Events
                        </Link>
                      </div>
                      <div className="flow-root">
                        <Link
                          to="/faq"
                          className="flex items-center p-3 -m-3 hover:bg-gray-50 rounded-lg"
                          onClick={() => setOpen(false)}
                        >
                          FAQ
                        </Link>
                      </div>
                      <div className="flow-root">
                        <Link
                          to="/contact"
                          className="flex items-center p-3 -m-3 hover:bg-gray-50 rounded-lg"
                          onClick={() => setOpen(false)}
                        >
                          Contact Us
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      {openCart && <Cart setOpenCart={setOpenCart} />}

      {/* Wishlist Sidebar */}
      {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
    </>
  );
};

export default Header;
