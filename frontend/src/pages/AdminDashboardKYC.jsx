import React from "react";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import KYCReview from "../components/Admin/KYCReview";

const AdminDashboardKYC = () => {
  return (
    <div className="flex">
      <div className="w-[20%]">
        <AdminSideBar active={7} />
      </div>
      <div className="w-[80%]">
        <KYCReview />
      </div>
    </div>
  );
};

export default AdminDashboardKYC; 