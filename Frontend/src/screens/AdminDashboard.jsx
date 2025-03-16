import { useState } from "react";
import Sidebar from "../components/Sidebar";
import AddProduct from "./AddProduct";
import ServiceProviders from "./ServiceProviders";
import AddPetAdoption from "./AddPetAdoption";
import AdoptionAdmin from "./AdoptionAdmin";
import AdoptionRequests from "./AdoptionRequests";
import AdminProducts from "./AdminProducts";

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("addProduct");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar setActivePage={setActivePage} />
      
      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activePage === "addProduct" && <AddProduct />}
        {activePage === "serviceProviders" && <ServiceProviders />}
        {activePage === "addPetAdoption" && <AddPetAdoption />}
        {activePage === "adop-request" && <AdoptionRequests />}
        {activePage === "adop-view" && <AdoptionAdmin />}
        {activePage === "admin-pro" && <AdminProducts />}

      </div>
    </div>
  );
};

export default AdminDashboard;
