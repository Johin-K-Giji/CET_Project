import { useEffect, useState } from "react";
import axios from "axios";

const ServiceProviders = () => {
  const [providers, setProviders] = useState([]);

  // ✅ Fetch Pending Providers
  const fetchPendingProviders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/pending-service-providers"
      );
      setProviders(response.data);
    } catch (error) {
      console.error("Failed to fetch pending providers:", error);
      alert("Failed to load service providers.");
    }
  };

  // ✅ Accept Service Provider
  const acceptProvider = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/accept-service-provider/${id}`
      );
      alert("Service provider accepted successfully!");
      fetchPendingProviders(); // ✅ Refresh list after accepting
    } catch (error) {
      console.error("Failed to accept provider:", error);
      alert("Failed to accept service provider.");
    }
  };

  useEffect(() => {
    fetchPendingProviders();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Pending Service Providers</h2>

      {providers.length === 0 ? (
        <p className="text-gray-500">No pending service providers found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Organization Name</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Registration ID</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone Number</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((provider) => (
              <tr key={provider._id} className="text-center">
                <td className="border p-2">{provider.orgName}</td>
                <td className="border p-2">{provider.orgLocation}</td>
                <td className="border p-2">{provider.orgRegId}</td>
                <td className="border p-2">{provider.email}</td>
                <td className="border p-2">{provider.phoneNumber}</td>
                <td className="border p-2">
                  <button
                    onClick={() => acceptProvider(provider._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Accept
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ServiceProviders;
