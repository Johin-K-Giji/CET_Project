import { useState } from "react";
import Navbar from "../components/Navbar";

const VeterinaryListPage = () => {
  const [vets, setVets] = useState([
    {
      _id: "1",
      clinicName: "Happy Paws Clinic",
      location: "Bangalore",
      phoneNumber: "9876543210",
      specialization: "General Checkup",
      clinicImage:
        "https://www.shutterstock.com/image-photo/north-bay-ontario-canada-april-260nw-286258970.jpg",
    },
    {
      _id: "2",
      clinicName: "Purrfect Care Clinic",
      location: "Mumbai",
      phoneNumber: "8765432109",
      specialization: "Dental Care",
      clinicImage:
        "https://content.jdmagicbox.com/v2/comp/mumbai/a7/022pxx22.xx22.140125213203.p2a7/catalogue/dr-anils-pet-animal-clinic-jogeshwari-east-mumbai-veterinary-doctors-w7miem.jpg",
    },
    {
      _id: "3",
      clinicName: "VetCare Clinic",
      location: "Delhi",
      phoneNumber: "7654321098",
      specialization: "Surgery",
      clinicImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWoIe1phz-BtHsZA76FJ6dwBfM4HZZHK-Rxg&s",
    },
    {
      _id: "4",
      clinicName: "Pet Haven Clinic",
      location: "Chennai",
      phoneNumber: "6543210987",
      specialization: "Vaccination",
      clinicImage:
        "https://www.shutterstock.com/image-photo/veterinary-clinic-building-exterior-view-260nw-1041175364.jpg",
    },
  ]);

  const [locationFilter, setLocationFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedVet, setSelectedVet] = useState(null);
  const [formData, setFormData] = useState({
    petType: "",
    ownerName: "",
    phoneNumber: "",
    location: "",
    petDisease: "",
    vaccinated: false,
    timeOfBooking: "",
  });

  // Open Modal
  const handleBookSlot = (vet) => {
    setSelectedVet(vet);
    setShowModal(true);
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/vet-bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          vetId: selectedVet._id,
        }),
      });

      if (res.ok) {
        alert("Booking request submitted successfully!");
        setShowModal(false);
      } else {
        alert("Failed to submit booking");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Error submitting booking");
    }
  };

  // Filter clinics based on location
  const filteredVets = vets.filter(
    (vet) => locationFilter === "" || vet.location === locationFilter
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
        <Navbar/>
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800 relative after:content-[''] after:block after:w-24 after:h-1 after:bg-gradient-to-r after:from-orange-400 after:to-orange-600 after:mx-auto after:mt-2">
        Veterinary Clinics
      </h2>

      {/* Filter Section */}
      <div className="flex justify-end mb-6 gap-4">
        <div>
          <label className="block mb-2 font-medium text-gray-600">
            Filter by Location
          </label>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-40 p-2 border rounded-md text-gray-700 focus:outline-none focus:border-orange-400"
          >
            <option value="">All</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Chennai">Chennai</option>
          </select>
        </div>
      </div>

      {/* Clinic List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVets.map((vet) => (
          <div
            key={vet._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 border border-gray-200"
          >
            <img
              src={vet.clinicImage}
              alt={vet.clinicName}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold truncate">
                {vet.clinicName}
              </h3>
              <p className="text-sm text-gray-600">📍 {vet.location}</p>
              <p className="text-sm text-gray-600">📞 {vet.phoneNumber}</p>
              <p className="text-sm text-gray-600">
                💼 {vet.specialization}
              </p>
              <button
                className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition"
                onClick={() => handleBookSlot(vet)}
              >
                Book Slot
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {showModal && selectedVet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-4">
              Book Slot at {selectedVet.clinicName}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="petType"
                value={formData.petType}
                onChange={handleChange}
                placeholder="Pet Type"
                required
                className="w-full p-2 border rounded-md"
              />
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                placeholder="Owner Name"
                required
                className="w-full p-2 border rounded-md"
              />
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="w-full p-2 border rounded-md"
              />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                required
                className="w-full p-2 border rounded-md"
              />
              <input
                type="text"
                name="petDisease"
                value={formData.petDisease}
                onChange={handleChange}
                placeholder="Pet Disease"
                required
                className="w-full p-2 border rounded-md"
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="vaccinated"
                  checked={formData.vaccinated}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <label className="text-sm">
                  Is your pet vaccinated?
                </label>
              </div>
              <input
                type="datetime-local"
                name="timeOfBooking"
                value={formData.timeOfBooking}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />

              {/* Submit and Close Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VeterinaryListPage;
