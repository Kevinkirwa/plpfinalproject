import React from "react";
import { Routes, Route } from "react-router-dom";
import ShopDashboardPage from "../pages/Shop/ShopDashboardPage";
import ShopCreateProduct from "../pages/Shop/ShopCreateProduct";
import ShopAllProducts from "../pages/Shop/ShopAllProducts";
import ShopCreateEvents from "../pages/Shop/ShopCreateEvents";
import ShopAllEvents from "../pages/Shop/ShopAllEvents";
import ShopAllOrders from "../pages/Shop/ShopAllOrders";
import ShopAllRefunds from "../pages/Shop/ShopAllRefunds";
import ShopOrderDetails from "../pages/Shop/ShopOrderDetails";
import ShopAllCoupons from "../pages/Shop/ShopAllCoupons";
import ShopPreviewPage from "../pages/Shop/ShopPreviewPage";
import ShopInboxPage from "../pages/Shop/ShopInboxPage";
import ShopSettingsPage from "../pages/Shop/ShopSettingsPage";
import ShopWithDrawMoneyPage from "../pages/Shop/ShopWithDrawMoneyPage";
import ShopMpesaSettings from "../pages/Shop/ShopMpesaSettings";
import ShopLayout from "../components/Shop/ShopLayout";

const ShopRoutes = () => {
  return (
    <ShopLayout>
      <Routes>
        <Route index element={<ShopDashboardPage />} />
        <Route path="create-product" element={<ShopCreateProduct />} />
        <Route path="products" element={<ShopAllProducts />} />
        <Route path="events" element={<ShopAllEvents />} />
        <Route path="create-event" element={<ShopCreateEvents />} />
        <Route path="orders" element={<ShopAllOrders />} />
        <Route path="refunds" element={<ShopAllRefunds />} />
        <Route path="order/:id" element={<ShopOrderDetails />} />
        <Route path="coupons" element={<ShopAllCoupons />} />
        <Route path="preview" element={<ShopPreviewPage />} />
        <Route path="inbox" element={<ShopInboxPage />} />
        <Route path="settings" element={<ShopSettingsPage />} />
        <Route path="withdraw-money" element={<ShopWithDrawMoneyPage />} />
        <Route path="mpesa-settings" element={<ShopMpesaSettings />} />
      </Routes>
    </ShopLayout>
  );
};

export default ShopRoutes;