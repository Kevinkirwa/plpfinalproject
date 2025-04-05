import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  CheckoutPage,
  PaymentPage,
  OrderSuccessPage,
  ProductDetailsPage,
  ProfilePage,
  ShopCreatePage,
  ShopLoginPage,
  OrderDetailsPage,
  TrackOrderPage,
  UserInbox,
  AboutPage,
} from "./routes/Routes.js";
import {
  ShopDashboardPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvents,
  ShopAllEvents,
  ShopAllCoupouns,
  ShopPreviewPage,
  ShopAllOrders,
  ShopOrderDetails,
  ShopAllRefunds,
  ShopSettingsPage,
  ShopWithDrawMoneyPage,
  ShopInboxPage,
} from "./routes/ShopRoutes";
import {
  AdminDashboardPage,
  AdminDashboardUsers,
  AdminDashboardSellers,
  AdminDashboardOrders,
  AdminDashboardProducts,
  AdminDashboardEvents,
  AdminDashboardWithdraw,
  AdminDashboardKYC
} from "./routes/AdminRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import { ShopHomePage } from "./ShopRoutes.js";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import { getAllProducts } from "./redux/actions/product";
import { getAllEvents } from "./redux/actions/event";
import axios from "axios";
import server from "./server";
import Loader from "./components/Layout/Loader";
import ErrorBoundary from "./components/ErrorBoundary";
import EmailVerification from './components/Signup/EmailVerification';
import ShopVerification from './components/Shop/ShopVerification';
import { initializeSocket, disconnectSocket } from './utils/socket';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Initialize socket connection
        initializeSocket();

        // Load products and events first since they don't require auth
        await Promise.all([
          store.dispatch(getAllProducts()),
          store.dispatch(getAllEvents())
        ]);

        // Check if we have a token before trying to load user data
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const [userResult, sellerResult] = await Promise.allSettled([
              store.dispatch(loadUser()),
              store.dispatch(loadSeller())
            ]);

            // Log the results for debugging
            console.log('User load result:', userResult);
            console.log('Seller load result:', sellerResult);

            // Handle any rejected promises
            if (userResult.status === 'rejected') {
              console.error('Error loading user:', userResult.reason);
              if (userResult.reason.response?.status === 401) {
                localStorage.removeItem('token');
              }
            }
            if (sellerResult.status === 'rejected') {
              console.error('Error loading seller:', sellerResult.reason);
            }
          } catch (error) {
            console.error('Error in auth data loading:', error);
            if (error.response?.status === 401) {
              localStorage.removeItem('token');
            }
          }
        }
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setIsLoading(false);
        setInitialLoadComplete(true);
      }
    };
    
    loadInitialData();

    // Cleanup function
    return () => {
      disconnectSocket();
    };
  }, []);

  if (isLoading && !initialLoadComplete) {
    return <Loader />;
  }

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          {/* Modern Background Elements */}
          <div className="fixed inset-0 -z-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),rgba(255,255,255,0))]"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-0 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>

          {/* Main Content */}
          <div className="relative z-10">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignupPage />} />
              <Route path="/activation/:activation_token" element={<ActivationPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="/best-selling" element={<BestSellingPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/order/success" element={<OrderSuccessPage />} />
              <Route path="/order/:id" element={<OrderDetailsPage />} />
              <Route path="/track/order/:id" element={<TrackOrderPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/inbox" element={<UserInbox />} />
              <Route path="/shop-create" element={<ShopCreatePage />} />
              <Route path="/shop-login" element={<ShopLoginPage />} />
              <Route path="/shop/:id" element={<ShopHomePage />} />
              <Route path="/verify-email" element={<EmailVerification />} />
              <Route path="/verify-shop" element={<ShopVerification />} />

              {/* Protected Routes */}
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <PaymentPage />
                  </ProtectedRoute>
                }
              />

              {/* Shop Routes */}
              <Route
                path="/dashboard"
                element={
                  <SellerProtectedRoute>
                    <ShopDashboardPage />
                  </SellerProtectedRoute>
                }
              />
              <Route
                path="/dashboard-products"
                element={
                  <SellerProtectedRoute>
                    <ShopAllProducts />
                  </SellerProtectedRoute>
                }
              />
              <Route
                path="/dashboard-create-product"
                element={
                  <SellerProtectedRoute>
                    <ShopCreateProduct />
                  </SellerProtectedRoute>
                }
              />
              <Route
                path="/dashboard-events"
                element={
                  <SellerProtectedRoute>
                    <ShopAllEvents />
                  </SellerProtectedRoute>
                }
              />
              <Route
                path="/dashboard-create-event"
                element={
                  <SellerProtectedRoute>
                    <ShopCreateEvents />
                  </SellerProtectedRoute>
                }
              />
              <Route
                path="/dashboard-coupouns"
                element={
                  <SellerProtectedRoute>
                    <ShopAllCoupouns />
                  </SellerProtectedRoute>
                }
              />
              <Route
                path="/dashboard-orders"
                element={
                  <SellerProtectedRoute>
                    <ShopAllOrders />
                  </SellerProtectedRoute>
                }
              />
              <Route
                path="/dashboard-refunds"
                element={
                  <SellerProtectedRoute>
                    <ShopAllRefunds />
                  </SellerProtectedRoute>
                }
              />
              <Route
                path="/dashboard-settings"
                element={
                  <SellerProtectedRoute>
                    <ShopSettingsPage />
                  </SellerProtectedRoute>
                }
              />
              <Route
                path="/dashboard-withdraw-money"
                element={
                  <SellerProtectedRoute>
                    <ShopWithDrawMoneyPage />
                  </SellerProtectedRoute>
                }
              />
              <Route
                path="/dashboard-messages"
                element={
                  <SellerProtectedRoute>
                    <ShopInboxPage />
                  </SellerProtectedRoute>
                }
              />
              <Route
                path="/shop/preview/:id"
                element={
                  <SellerProtectedRoute>
                    <ShopPreviewPage />
                  </SellerProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboardPage />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin-users"
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboardUsers />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin-sellers"
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboardSellers />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin-orders"
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboardOrders />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin-products"
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboardProducts />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin-events"
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboardEvents />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin-withdraw-request"
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboardWithdraw />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin-kyc"
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboardKYC />
                  </ProtectedAdminRoute>
                }
              />
            </Routes>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
console.log('Auth state:', store.getState().user, store.getState().seller)
