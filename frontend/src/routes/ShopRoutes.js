import ShopDashboardPage from "../pages/Shop/ShopDashboardPage";
import ShopAllProducts from "../pages/Shop/ShopAllProducts";
import CreateProduct from "../pages/Shop/CreateProduct";
import ShopOrders from "../pages/Shop/ShopOrders";
import ShopSettings from "../pages/Shop/ShopSettings";
import ShopWithdrawMoney from "../pages/Shop/ShopWithdrawMoney";

const shopRoutes = [
  {
    path: "/dashboard",
    element: <ShopDashboardPage />,
  },
  {
    path: "/dashboard-products",
    element: <ShopAllProducts />,
  },
  {
    path: "/dashboard-create-product",
    element: <CreateProduct />,
  },
  {
    path: "/dashboard-orders",
    element: <ShopOrders />,
  },
  {
    path: "/dashboard-settings",
    element: <ShopSettings />,
  },
  {
    path: "/dashboard-withdraw-money",
    element: <ShopWithdrawMoney />,
  },
];

export { shopRoutes };