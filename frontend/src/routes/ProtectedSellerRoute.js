import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedSellerRoute = ({ children }) => {
  const { isSeller, seller } = useSelector((state) => state.seller);

  if (!isSeller) {
    return <Navigate to="/shop-login" replace />;
  }

  return children;
};

export default ProtectedSellerRoute; 