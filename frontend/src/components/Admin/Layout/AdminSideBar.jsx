import React from "react";
import { FiShoppingBag, FiUsers, FiSettings } from "react-icons/fi";
import { GrWorkshop } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsBox } from "react-icons/bs";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";

const AdminSideBar = ({ active }) => {
  const menuSections = [
    {
      title: "Main",
      items: [
        {
          id: 1,
          title: "Dashboard",
          icon: RxDashboard,
          path: "/admin/dashboard",
        },
        {
          id: 2,
          title: "Orders",
          icon: FiShoppingBag,
          path: "/admin-orders",
          badge: "12",
        },
      ],
    },
    {
      title: "Management",
      items: [
        {
          id: 3,
          title: "Sellers",
          icon: GrWorkshop,
          path: "/admin-sellers",
        },
        {
          id: 4,
          title: "Users",
          icon: HiOutlineUserGroup,
          path: "/admin-users",
        },
        {
          id: 5,
          title: "Products",
          icon: BsBox,
          path: "/admin-products",
        },
        {
          id: 6,
          title: "Events",
          icon: MdOutlineLocalOffer,
          path: "/admin-events",
          badge: "New",
        },
      ],
    },
    {
      title: "Security",
      items: [
        {
          id: 7,
          title: "KYC Verification",
          icon: FaUserCheck,
          path: "/admin-kyc",
          badge: "3",
        },
      ],
    },
    {
      title: "System",
      items: [
        {
          id: 8,
          title: "Settings",
          icon: FiSettings,
          path: "/admin-settings",
        },
      ],
    },
  ];

  return (
    <div className="h-full bg-white border-r border-gray-200">
      <div className="p-4 space-y-8">
        {menuSections.map((section, index) => (
          <div key={index}>
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {section.title}
            </h3>
            <div className="mt-3 space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`group flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 ${
                      active === item.id
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center min-w-0">
                      <Icon
                        size={20}
                        className={`flex-shrink-0 ${
                          active === item.id ? "text-blue-600" : "text-gray-400 group-hover:text-gray-500"
                        }`}
                      />
                      <span className="ml-3 text-sm font-medium truncate">
                        {item.title}
                      </span>
      </div>
                    {item.badge && (
                      <span
                        className={`ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          item.badge === "New"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
        </Link>
                );
              })}
      </div>
      </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSideBar;
