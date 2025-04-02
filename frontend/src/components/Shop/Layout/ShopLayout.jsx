import React from "react";
import ShopSideBar from "./ShopSideBar";

const ShopLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <ShopSideBar />
      <div className="flex-1 ml-[250px]">
        {children}
      </div>
    </div>
  );
};

export default ShopLayout; 