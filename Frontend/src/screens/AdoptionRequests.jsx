import { useEffect, useState } from "react";
import axios from "axios";

const AdoptionRequests = () => {
  const [requests, setRequests] = useState([]);

  // ✅ Fetch Pending Adoption Requests
  const fetchPendingRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/adoptions/adoption-requests/"
      );
      setRequests(response.data);
    } catch (error) {
      console.error("Failed to fetch adoption requests:", error);
      alert("Failed to load adoption requests.");
    }
  };

  // ✅ Accept Adoption Request
  const acceptRequest = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/accept-adoption-request/${id}`
      );
      alert("Adoption request accepted successfully!");
      fetchPendingRequests(); // ✅ Refresh list after accepting
    } catch (error) {
      console.error("Failed to accept request:", error);
      alert("Failed to accept adoption request.");
    }
  };

  // ✅ Download ID Proof
  const downloadIdProof = (filePath) => {
    const fileUrl = `http://localhost:5000/${filePath.replace(/\\/g, "/")}`;
    window.open(fileUrl, "_blank");
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Pending Adoption Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-500">No pending adoption requests found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">User Name</th>
              <th className="border p-2">Phone Number</th>
              <th className="border p-2">Pet ID (Last 4 Digits)</th>
              <th className="border p-2">Age</th>
              <th className="border p-2">Other Pets</th>
              <th className="border p-2">Reason</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id} className="text-center">
                <td className="border p-2">{request.userName}</td>
                <td className="border p-2">{request.phoneNumber}</td>
                <td className="border p-2">
                  {request.adoptionPostId?._id.slice(-4)} {/* Last 4 digits */}
                </td>
                <td className="border p-2">{request.userAge}</td>
                <td className="border p-2">
                  {request.hasOtherPets ? "Yes" : "No"}
                </td>
                <td className="border p-2 text-sm truncate max-w-xs">
                  {request.adoptionReason}
                </td>
                <td className="border p-2">
                  {/* ✅ Accept Button */}
                  <button
                    onClick={() => acceptRequest(request._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
                  >
                    Accept
                  </button>

                  {/* ✅ Download ID Proof Button */}
                  {request.idProof && (
                    <button
                      onClick={() => downloadIdProof(request.idProof)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Download ID
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdoptionRequests;
