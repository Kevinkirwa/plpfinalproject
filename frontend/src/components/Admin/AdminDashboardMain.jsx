import React, { useEffect, useState } from "react";
import { AiOutlineMoneyCollect, AiOutlineShoppingCart, AiOutlineUser, AiOutlineShop } from "react-icons/ai";
import { MdBorderClear } from "react-icons/md";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../../redux/actions/order";
import Loader from "../Layout/Loader";
import { getAllSellers } from "../../redux/actions/sellers";

const AdminDashboardMain = () => {
  const dispatch = useDispatch();
  const { adminOrders, adminOrderLoading } = useSelector((state) => state.order);
  const { sellers } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
    dispatch(getAllSellers());
  }, []);

  const adminEarning = adminOrders && adminOrders.reduce((acc, item) => acc + item.totalPrice * .10, 0);
   const adminBalance = adminEarning?.toFixed(2);

  // Calculate order statistics
  const totalOrders = adminOrders?.length || 0;
  const deliveredOrders = adminOrders?.filter(order => order.status === "Delivered").length || 0;
  const processingOrders = adminOrders?.filter(order => order.status === "Processing").length || 0;

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      renderCell: (params) => {
        const status = params.value;
        let className = "px-2 py-1 rounded-full text-xs font-medium ";
        if (status === "Delivered") {
          className += "bg-green-100 text-green-800";
        } else if (status === "Processing") {
          className += "bg-yellow-100 text-yellow-800";
        } else {
          className += "bg-red-100 text-red-800";
        }
        return <span className={className}>{status}</span>;
      }
    },
    {
      field: "itemsQty",
      headerName: "Items",
      type: "number",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "total",
      headerName: "Amount",
      minWidth: 130,
      flex: 0.8,
      renderCell: (params) => (
        <span className="font-medium">{params.value}</span>
      ),
    },
    {
      field: "createdAt",
      headerName: "Order Date",
      minWidth: 130,
      flex: 0.8,
    },
  ];

  const row = [];
  adminOrders &&
  adminOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
        total: item?.totalPrice + " $",
        status: item?.status,
        createdAt: item?.createdAt.slice(0, 10),
      });
    });

  return (
   <>
      {adminOrderLoading ? (
        <Loader />
      ) : (
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-sm p-6">
            <h1 className="text-2xl font-bold text-white">Welcome back, Admin!</h1>
            <p className="text-blue-100 mt-1">Here's what's happening with your store today.</p>
          </div>
  
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Revenue Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-50 rounded-full">
                  <AiOutlineMoneyCollect className="text-2xl text-blue-600" />
                </div>
                <span className="text-sm font-medium text-green-600">+4.5%</span>
              </div>
              <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
              <p className="text-2xl font-bold text-gray-800 mt-1">${adminBalance}</p>
              <div className="mt-4">
                <Link to="/admin-orders" className="text-sm text-blue-600 hover:text-blue-700">
                  View details →
                </Link>
              </div>
            </div>

            {/* Sellers Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-50 rounded-full">
                  <AiOutlineShop className="text-2xl text-purple-600" />
                </div>
                <span className="text-sm font-medium text-green-600">+2.7%</span>
              </div>
              <h3 className="text-sm font-medium text-gray-500">Total Sellers</h3>
              <p className="text-2xl font-bold text-gray-800 mt-1">{sellers?.length || 0}</p>
              <div className="mt-4">
                <Link to="/admin-sellers" className="text-sm text-blue-600 hover:text-blue-700">
                  View details →
            </Link>
          </div>
            </div>

            {/* Orders Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-50 rounded-full">
                  <AiOutlineShoppingCart className="text-2xl text-green-600" />
                </div>
                <span className="text-sm font-medium text-green-600">+12.4%</span>
              </div>
              <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
              <p className="text-2xl font-bold text-gray-800 mt-1">{totalOrders}</p>
              <div className="mt-4">
                <Link to="/admin-orders" className="text-sm text-blue-600 hover:text-blue-700">
                  View details →
            </Link>
          </div>
        </div>
  
            {/* Processing Orders */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-50 rounded-full">
                  <AiOutlineShoppingCart className="text-2xl text-yellow-600" />
                </div>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                  {processingOrders} pending
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-500">Processing Orders</h3>
              <p className="text-2xl font-bold text-gray-800 mt-1">{processingOrders}</p>
              <div className="mt-4">
                <Link to="/admin-orders" className="text-sm text-blue-600 hover:text-blue-700">
                  View details →
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Recent Orders</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Showing {Math.min(row.length, 5)} of {row.length} orders
                  </p>
                </div>
                <Link to="/admin-orders" className="text-sm text-blue-600 hover:text-blue-700">
                  View all →
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="w-full">
          <DataGrid
            rows={row}
            columns={columns}
                  pageSize={5}
            disableSelectionOnClick
            autoHeight
                  className="border-none"
                  rowHeight={64}
                  headerHeight={48}
                  getRowClassName={() => "hover:bg-gray-50"}
          />
        </div>
      </div>
          </div>
        </div>
      )}
   </>
  );
};

export default AdminDashboardMain;
