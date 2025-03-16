import { useState } from "react";
import AddService from "./AddService";
import ViewServices from "./ViewServices";
import ViewBookings from "./ViewBookings";
import Sidebar from "../components/SideBarSP";
import { useLocation } from "react-router-dom";

const ServiceProviderDashboard = () => {
  const [activePage, setActivePage] = useState("addService");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId"); // ✅ Get userId from localStorage

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar setActivePage={setActivePage} />

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activePage === "addService" && <AddService userId={userId} />}
        {activePage === "viewServices" && <ViewServices userId={userId} />}
        {activePage === "viewBookings" && <ViewBookings userId={userId} />}
      </div>
    </div>
  );
};

export default ServiceProviderDashboard;
