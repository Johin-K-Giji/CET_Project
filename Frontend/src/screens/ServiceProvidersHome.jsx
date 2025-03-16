import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const ServiceProvidersPage = () => {
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);
  const [location, setLocation] = useState("");

  // ✅ Fetch approved providers from the backend
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/service-providers");
        setProviders(response.data);
      } catch (error) {
        console.error("Failed to fetch service providers:", error);
      }
    };

    fetchProviders();
  }, []);

  const handleShowServices = (provider) => {
    navigate(`/services?id=${provider._id}`); // ✅ Pass as query parameter
  };
  
  

  const filteredProviders = providers.filter((provider) => {
    return location === "" || provider.orgLocation === location;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Navbar />
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800 relative after:content-[''] after:block after:w-24 after:h-1 after:bg-gradient-to-r after:from-orange-400 after:to-orange-600 after:mx-auto after:mt-2">
        Service Providers
      </h2>

      {/* Filter Section */}
      <div className="flex justify-end mb-6 gap-4">
        <div>
          <label className="block mb-2 font-medium text-gray-600">Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-36 p-2 border rounded-md text-gray-700 focus:outline-none focus:border-orange-400"
          >
            <option value="">All</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Chennai">Chennai</option>
          </select>
        </div>
      </div>

      {/* Providers List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProviders.map((provider) => (
          <div
            key={provider._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 border border-gray-200 p-4"
          >
            <h3 className="text-lg font-semibold truncate">{provider.orgName}</h3>
            <p className="text-sm text-gray-600">📍 {provider.orgLocation}</p>
            <p className="text-sm text-gray-600">📧 {provider.email}</p>
            <p className="text-sm text-gray-600">📞 {provider.phoneNumber}</p>

            {/* Services Provided Section */}
            <div className="mt-3">
              {/* <p className="text-sm font-semibold text-gray-700 mb-2">🛠️ Services Provided:</p>
              <ul className="list-disc list-inside text-gray-600 text-sm">
                {provider.servicesOffered.map((service, index) => (
                  <li key={index} className="truncate">
                    {service}
                  </li>
                ))}
              </ul> */}
            </div>

            {/* Button */}
            <button
              className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition"
              onClick={() => handleShowServices(provider)}
            >
              Show Services
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceProvidersPage;
