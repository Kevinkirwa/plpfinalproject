import React from "react";
import { Routes, Route } from "react-router-dom";
import ShopDashboardPage from "../pages/Shop/ShopDashboardPage";
import ShopCreateProduct from "../pages/Shop/ShopCreateProduct";
import ShopAllProducts from "../pages/Shop/ShopAllProducts";
import ShopCreateEvents from "../pages/Shop/ShopCreateEvents";
import ShopAllEvents from "../pages/Shop/ShopAllEvents";
import ShopAllCoupons from "../pages/Shop/ShopAllCoupons";
import ShopPreviewPage from "../pages/Shop/ShopPreviewPage";
import ShopAllOrders from "../pages/Shop/ShopAllOrders";
import ShopOrderDetails from "../pages/Shop/ShopOrderDetails";
import ShopAllRefunds from "../pages/Shop/ShopAllRefunds";
import ShopSettingsPage from "../pages/Shop/ShopSettingsPage";
import ShopWithdrawMoney from "../pages/Shop/ShopWithdrawMoney";
import ShopInboxPage from "../pages/Shop/ShopInboxPage";

const ShopRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<ShopDashboardPage />} />
      <Route path="/create-product" element={<ShopCreateProduct />} />
      <Route path="/products" element={<ShopAllProducts />} />
      <Route path="/events" element={<ShopAllEvents />} />
      <Route path="/create-event" element={<ShopCreateEvents />} />
      <Route path="/orders" element={<ShopAllOrders />} />
      <Route path="/order/:id" element={<ShopOrderDetails />} />
      <Route path="/coupons" element={<ShopAllCoupons />} />
      <Route path="/preview" element={<ShopPreviewPage />} />
      <Route path="/inbox" element={<ShopInboxPage />} />
      <Route path="/settings" element={<ShopSettingsPage />} />
      <Route path="/withdraw-money" element={<ShopWithdrawMoney />} />
    </Routes>
  );
};

export default ShopRoutes;