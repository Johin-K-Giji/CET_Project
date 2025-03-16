import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ServicesPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const [services, setServices] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [serviceType, setServiceType] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    petType: "",
    ownerName: "",
    phoneNumber: "",
    location: "",
    modeOfService: "",
    timeNeeded: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Fetch services for the specific provider
  useEffect(() => {
    const fetchServices = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:5000/api/services/view-services/${id}`);
          setServices(response.data);
        } catch (error) {
          console.error("Failed to fetch services:", error);
        }
      }
    };

    fetchServices();
  }, [id]);

  const filteredServices = services
    .filter((service) => !serviceType || service.type === serviceType)
    .sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));

  // ✅ Open booking modal
  const handleOpenModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  // ✅ Close booking modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  // ✅ Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Submit booking
  const handleBooking = async () => {
    try {
      const payload = {
        serviceId: selectedService._id,
        ...bookingDetails,
      };

      await axios.post("http://localhost:5000/api/bookingsSP/book-service", payload);

      alert("Service booked successfully!");
      handleCloseModal();
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Failed to book service!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        Services
      </h2>

      {/* Filter Section */}
      <div className="flex justify-end mb-6 gap-4">
        <div>
          <label className="block mb-2 font-medium text-gray-600">Sort by Price</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-36 p-2 border rounded-md text-gray-700"
          >
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 font-medium text-gray-600">Service Type</label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-36 p-2 border rounded-md text-gray-700"
          >
            <option value="">All</option>
            <option value="Grooming">Grooming</option>
            <option value="Sitting">Sitting</option>
            <option value="Medical">Medical</option>
            <option value="Boarding">Boarding</option>
            <option value="Walking">Walking</option>
            <option value="Training">Training</option>
          </select>
        </div>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredServices.map((service) => (
          <div key={service._id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={`http://localhost:5000/${service.image}`}
              alt={service.serviceName}
              className="w-full h-32 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-2">{service.serviceName}</h3>
            <p className="text-gray-600 mt-1">{service.description}</p>
            <p className="text-orange-500 font-bold mt-1">₹{service.price}</p>
            <button
              className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
              onClick={() => handleOpenModal(service)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* ✅ Booking Modal */}
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">
              Book {selectedService.serviceName}
            </h3>
            <input
              type="text"
              name="petType"
              placeholder="Pet Type"
              value={bookingDetails.petType}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md mb-2"
            />
            <input
              type="text"
              name="ownerName"
              placeholder="Owner Name"
              value={bookingDetails.ownerName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md mb-2"
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={bookingDetails.phoneNumber}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md mb-2"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={bookingDetails.location}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md mb-2"
            />
            <select
  name="modeOfService"
  value={bookingDetails.modeOfService}
  onChange={handleInputChange}
  className="w-full p-2 border rounded-md mb-2"
>
  <option value="">Select Mode of Service</option>
  <option value="In Pet Shop">In Pet Shop</option>
  <option value="In Home">In Home</option>
</select>

            <input
              type="text"
              name="timeNeeded"
              placeholder="Time Needed"
              value={bookingDetails.timeNeeded}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md mb-2"
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
