import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FaBuilding, FaUsers, FaTools, FaMoneyBillWave } from "react-icons/fa";
import dayjs from "dayjs";

import {
  SwipeableList,
  SwipeableListItem,
  TrailingActions,
  SwipeAction,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

const landlordData = {
  properties: 5,
  tenants: 12,
  maintenanceRequests: 7,
  duePayments: 3,
};

const recentRequests = [
  { id: 1, tenant: "Ravi Kumar", issue: "Water leakage", status: "Pending", date: "2025-06-08" },
  { id: 2, tenant: "Priya Singh", issue: "Power outage", status: "In Progress", date: "2025-06-07" },
  { id: 3, tenant: "Ajay Mehta", issue: "Broken window", status: "Completed", date: "2025-06-06" },
];

const recentPayments = [
  { id: 1, tenant: "Ravi Kumar", amount: "₹12,000", status: "Paid", date: "2025-06-01" },
  { id: 2, tenant: "Priya Singh", amount: "₹11,500", status: "Due", date: "2025-06-01" },
];

const StatBox = ({ icon: Icon, label, value, bgColor }) => (
  <div className={`p-4 rounded shadow text-white ${bgColor}`}>
    <div className="flex items-center space-x-3">
      <Icon className="text-3xl" />
      <div>
        <p className="text-xl font-bold">{value}</p>
        <p className="text-sm">{label}</p>
      </div>
    </div>
  </div>
);

const LandlordDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Tenant messages state to allow deleting
  const [tenantMessages, setTenantMessages] = useState([
    { id: 1, tenant: "Ravi Kumar", message: "Need urgent repair", date: "2025-06-09 10:00" },
    { id: 2, tenant: "Priya Singh", message: "Rent will be delayed", date: "2025-06-08 16:45" },
  ]);

  // Rating form state
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  // Swipe-to-delete handlers
  const handleDeleteMessage = (id) => {
    setTenantMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const trailingActions = (id) => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => handleDeleteMessage(id)}>
        Delete
      </SwipeAction>
    </TrailingActions>
  );

  const handleSubmitRating = (e) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      alert("Please select a rating between 1 and 5.");
      return;
    }
    // Here you can handle submission, e.g., send to backend or firebase
    console.log("Rating submitted:", { rating, comment });
    setSubmitted(true);
    setRating(0);
    setComment("");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center bg-white p-4 rounded shadow w-full sm:w-auto">
          <img
            src="/default-avatar.png"
            alt="avatar"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h2 className="text-xl font-bold">{user?.displayName || "Landlord"}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-sm text-green-600">Role: Landlord</p>
          </div>
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <button
            onClick={() => navigate("/tips")}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition w-full sm:w-auto"
          >
            📘 Tips & Guidelines
          </button>

          <Link
            to="/landlord-console"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 shadow w-full sm:w-auto text-center"
          >
            🛠️ Open Landlord Console
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatBox
          icon={FaBuilding}
          label="Properties"
          value={landlordData.properties}
          bgColor="bg-blue-600"
        />
        <StatBox
          icon={FaUsers}
          label="Tenants"
          value={landlordData.tenants}
          bgColor="bg-green-600"
        />
        <StatBox
          icon={FaTools}
          label="Requests"
          value={landlordData.maintenanceRequests}
          bgColor="bg-yellow-500"
        />
        <StatBox
          icon={FaMoneyBillWave}
          label="Due Payments"
          value={landlordData.duePayments}
          bgColor="bg-red-500"
        />
      </div>

      <div className="flex gap-4 mb-6 flex-wrap">
        <Link
          to="/maintenance-appointments"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          📅 View Maintenance Appointments
        </Link>
      </div>

      {/* Maintenance Requests */}
      <div className="bg-white p-4 rounded shadow mb-6 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Recent Maintenance Requests</h3>
        <table className="w-full text-sm text-left min-w-[600px]">
          <thead className="text-xs bg-gray-200 uppercase text-gray-700">
            <tr>
              <th className="px-4 py-2">Tenant</th>
              <th className="px-4 py-2">Issue</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentRequests.map((req) => (
              <tr key={req.id} className="border-b">
                <td className="px-4 py-2">{req.tenant}</td>
                <td className="px-4 py-2">{req.issue}</td>
                <td className="px-4 py-2">{dayjs(req.date).format("MMM D, YYYY")}</td>
                <td className="px-4 py-2">
                  <span
                    className={`text-sm font-semibold ${
                      req.status === "Completed"
                        ? "text-green-600"
                        : req.status === "Pending"
                        ? "text-yellow-600"
                        : "text-blue-600"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Overview */}
      <div className="bg-white p-4 rounded shadow mb-6 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Recent Payments</h3>
        <ul className="space-y-2 min-w-[300px]">
          {recentPayments.map((p) => (
            <li
              key={p.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-medium">{p.tenant}</p>
                <p className="text-sm text-gray-500">
                  {dayjs(p.date).format("MMM D, YYYY")}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{p.amount}</p>
                <p
                  className={`text-sm ${
                    p.status === "Paid" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {p.status}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Messages from Tenants with Swipe to Delete */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-lg font-semibold mb-4">Tenant Messages</h3>
        <SwipeableList>
          {tenantMessages.map((msg) => (
            <SwipeableListItem
              key={msg.id}
              trailingActions={trailingActions(msg.id)}
            >
              <div className="border-b p-4 bg-white rounded mb-2">
                <p className="font-medium">{msg.tenant}:</p>
                <p className="text-gray-700">{msg.message}</p>
                <p className="text-xs text-gray-500">
                  {dayjs(msg.date).format("MMM D, h:mm A")}
                </p>
              </div>
            </SwipeableListItem>
          ))}
        </SwipeableList>
      </div>

      {/* Rating Form */}
      <div className="bg-white p-6 rounded shadow max-w-md mx-auto mb-10">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Submit Your Rating
        </h3>
        {submitted ? (
          <p className="text-green-600 text-center font-semibold">
            Thank you for your feedback!
          </p>
        ) : (
          <form onSubmit={handleSubmitRating} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">
                Rating (1 to 5 stars):
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-3xl ${
                      star <= rating ? "text-yellow-400" : "text-gray-300"
                    } focus:outline-none`}
                    aria-label={`${star} star`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="comment">
                Comments (optional):
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="w-full border rounded px-3 py-2 text-gray-900"
                placeholder="Write your feedback here..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
            >
              Submit Rating
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LandlordDashboard;
