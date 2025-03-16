import { useEffect, useState } from "react";
import axios from "axios";

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/service-provider/bookings"
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      {bookings.map((booking) => (
        <div key={booking._id} className="border p-4 mb-2">
          <p><strong>Service:</strong> {booking.serviceName}</p>
          <p><strong>Booked By:</strong> {booking.userName}</p>
          <p><strong>Status:</strong> {booking.status}</p>
        </div>
      ))}
    </div>
  );
};

export default ViewBookings;
