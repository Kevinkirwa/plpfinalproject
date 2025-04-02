import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import BestSellingPage from "./pages/BestSellingPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import EventsPage from "./pages/EventsPage";
import FAQPage from "./pages/FAQPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import ProfilePage from "./pages/ProfilePage";
import AllOrders from "./pages/AllOrders";
import AllRefundOrders from "./pages/AllRefundOrders";
import TrackOrderPage from "./pages/TrackOrderPage";
import UserInbox from "./pages/UserInbox";
import AboutUs from "./pages/AboutUs";
import Careers from "./pages/Careers";
import StoreLocations from "./pages/StoreLocations";
import Blog from "./pages/Blog";
import ContactUs from "./pages/ContactUs";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/order/success" element={<OrderSuccessPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/user/orders" element={<AllOrders />} />
        <Route path="/user/refunds" element={<AllRefundOrders />} />
        <Route path="/user/track-order" element={<TrackOrderPage />} />
        <Route path="/user/inbox" element={<UserInbox />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/store-locations" element={<StoreLocations />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Layout>
  );
};

export default App; 