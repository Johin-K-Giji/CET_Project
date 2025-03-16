import { useState } from "react";
import { FaBars, FaBox, FaUsers, FaPaw } from "react-icons/fa";

const Sidebar = ({ setActivePage }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen bg-gray-800 text-white w-64">
      <div className="p-5 flex items-center justify-between">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <FaBars 
          className="text-2xl cursor-pointer md:hidden" 
          onClick={() => setOpen(!open)} 
        />
      </div>
      <nav className={`${open ? "block" : "hidden"} md:block`}>
        <ul>
          <li
            className="p-4 cursor-pointer hover:bg-gray-700"
            onClick={() => setActivePage("addProduct")}
          >
            <FaBox className="inline mr-2" /> Add Product
          </li>
          <li
            className="p-4 cursor-pointer hover:bg-gray-700"
            onClick={() => setActivePage("admin-pro")}
          >
            <FaBox className="inline mr-2" /> View Product
          </li>
          <li
            className="p-4 cursor-pointer hover:bg-gray-700"
            onClick={() => setActivePage("serviceProviders")}
          >
            <FaUsers className="inline mr-2" /> Service Providers
          </li>
          <li
            className="p-4 cursor-pointer hover:bg-gray-700"
            onClick={() => setActivePage("addPetAdoption")}
          >
            <FaPaw className="inline mr-2" /> Add Pet Adoption
          </li>
          <li
            className="p-4 cursor-pointer hover:bg-gray-700"
            onClick={() => setActivePage("adop-view")}
          >
            <FaPaw className="inline mr-2" /> View  Adoptions
          </li>
          <li
            className="p-4 cursor-pointer hover:bg-gray-700"
            onClick={() => setActivePage("adop-request")}
          >
            <FaPaw className="inline mr-2" /> View  Adoptions Request
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
