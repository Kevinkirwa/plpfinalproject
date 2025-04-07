import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";

const SellerProtectedRoute = ({ children }) => {
  const { isLoading, isSeller } = useSelector((state) => state.seller);

  console.log("SellerProtectedRoute - Auth State:", { isLoading, isSeller });

  if (isLoading) {
    return <Loader />;
  }

  if (!isSeller) {
    console.log("SellerProtectedRoute - Not a seller, redirecting to shop-login");
    return <Navigate to="/shop-login" replace />;
  }

  console.log("SellerProtectedRoute - Authenticated seller, rendering protected content");
  return children;
};

export default SellerProtectedRoute;
