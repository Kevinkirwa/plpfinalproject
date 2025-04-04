import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";

const SellerProtectedRoute = ({ children }) => {
  const { isLoading, isSeller } = useSelector((state) => state.seller);
  const { isAuthenticated } = useSelector((state) => state.user);

  console.log("SellerProtectedRoute - Auth State:", { isLoading, isSeller, isAuthenticated });

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    console.log("SellerProtectedRoute - Not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  if (!isSeller) {
    console.log("SellerProtectedRoute - Not a seller, redirecting to shop-create");
    return <Navigate to="/shop-create" replace />;
  }

  console.log("SellerProtectedRoute - Authenticated seller, rendering protected content");
  return children;
};

export default SellerProtectedRoute;
