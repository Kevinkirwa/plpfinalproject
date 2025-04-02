import React from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import AdminDashboardMain from "../components/Admin/AdminDashboardMain";

const AdminDashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex h-[calc(100vh-70px)]">
        {/* Sidebar */}
        <div className="hidden md:block w-64 bg-white shadow-sm">
          <AdminSideBar active={1} />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6">
            <AdminDashboardMain />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
