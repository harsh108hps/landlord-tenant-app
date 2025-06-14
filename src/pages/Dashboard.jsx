import { useEffect, useState } from "react";
import { auth, database } from "../firebase";
import { ref, set } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";

import {
  FaTools,
  FaMoneyBillWave,
  FaUser,
  FaCommentDots,
  FaRobot,
} from "react-icons/fa";
import dayjs from "dayjs";
import FeaturesHighlight from "../components/FeaturesHighlight";
import Chatbot from "../components/Chatbot";
import VoiceCommand from "../components/VoiceCommand";

// RatingForm component embedded here for simplicity
const RatingForm = ({ targetUserId, targetUserType }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      setMessage("Please select a rating between 1 and 5.");
      return;
    }

    const raterId = auth.currentUser?.uid;
    if (!raterId) {
      setMessage("You must be logged in to submit a rating.");
      return;
    }

    const path =
      targetUserType === "landlord"
        ? `ratings/landlords/${targetUserId}/${raterId}`
        : `ratings/tenants/${targetUserId}/${raterId}`;

    try {
      await set(ref(database, path), {
        rating,
        comment,
        timestamp: Date.now(),
      });
      setMessage("Thanks for your feedback!");
      setRating(0);
      setComment("");
    } catch (error) {
      setMessage("Error submitting rating. Try again later.");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md bg-white dark:bg-gray-800 p-6 rounded shadow m-4"
    >
      <h3 className="text-xl font-semibold mb-4">
        Rate Your {targetUserType === "landlord" ? "Landlord" : "Tenant"}
      </h3>

      <label className="block mb-2 font-medium">Rating (1 to 5 stars)</label>
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="w-full mb-4 p-2 border rounded"
        required
      >
        <option value={0}>Select rating</option>
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>
            {num} Star{num > 1 ? "s" : ""}
          </option>
        ))}
      </select>

      <label className="block mb-2 font-medium">Comment (optional)</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        className="w-full mb-4 p-2 border rounded"
        placeholder="Write your feedback here..."
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>

      {message && (
        <p className="mt-3 text-green-600 dark:text-green-400">{message}</p>
      )}
    </form>
  );
};

// Greeting message with emoji based on current hour
const getGreeting = (name) => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12)
    return `☀️ Good Morning, ${name}! Here's your dashboard.`;
  if (hour >= 12 && hour < 17)
    return `🌤️ Good Afternoon, ${name}! Here's your dashboard.`;
  if (hour >= 17 && hour < 22)
    return `🌆 Good Evening, ${name}! Here's your dashboard.`;
  return `🌙 Hello, ${name}! Here's your dashboard.`;
};

// Mock data for demo purpose
const mockRequests = [
  { id: 1, type: "Plumbing", urgency: "High", status: "In Progress", date: "2025-06-01" },
  { id: 2, type: "Electrical", urgency: "Medium", status: "Pending", date: "2025-06-08" },
  { id: 3, type: "General", urgency: "Low", status: "Completed", date: "2025-06-05" },
];

const mockMessages = [
  { id: 1, from: "Landlord", message: "Maintenance team will arrive tomorrow.", time: "2025-06-09 10:30" },
  { id: 2, from: "Tenant", message: "Rent paid for June.", time: "2025-06-08 14:20" },
];

// Small reusable stat box component
const StatBox = ({ icon: Icon, label, value, bgColor }) => (
  <div className={`p-4 rounded shadow text-white ${bgColor}`}>
    <div className="flex items-center space-x-3">
      <Icon className="text-3xl" />
      <div>
        <p className="text-lg font-semibold">{value}</p>
        <p className="text-sm">{label}</p>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [landlordId, setLandlordId] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    setUser(currentUser);

    // Placeholder: Fetch landlord ID logic here, for demo it's hardcoded
    const fetchLandlordId = async () => {
      // Replace with actual Firebase query to get landlordId related to tenant
      setLandlordId("landlord-uid-example-123");
    };
    fetchLandlordId();
  }, []);

  if (!user) return <p className="p-4">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Navbar */}
      <div className="bg-white dark:bg-gray-800 shadow p-4 flex flex-wrap justify-between items-center gap-2">
        <h1 className="text-xl font-bold">🏠 Dashboard</h1>

        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => navigate("/tips")}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            📘 Tips & Guidelines
          </button>

          <Link
            to="/"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            🔙 Landing Page
          </Link>

          <Link
            to="/schedule-appointment"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            🛠️ Schedule Maintenance
          </Link>

          <Link
            to="/landlord-dashboard"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          >
            🔐 Landlord Dashboard
          </Link>

          <button
            onClick={() => setShowChatbot((prev) => !prev)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
          >
            <FaRobot />
            {showChatbot ? "Hide Chatbot" : "AI Assistant"}
          </button>
        </div>
      </div>

      {/* Welcome Banner */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow m-4 text-center text-xl font-semibold">
        {getGreeting(user.displayName || "User")}
      </div>

      {/* User Profile */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow m-4 flex items-center gap-4 max-w-md mx-auto">
        <img
          src="/default-avatar.png"
          alt="avatar"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-xl font-bold">{user.displayName || "User"}</h2>
          <p className="text-gray-600 dark:text-gray-300">{user.email || "No email"}</p>
          <p className="text-sm text-blue-500">Role: Tenant</p>
        </div>
      </div>

      {/* Features Highlight */}
      <div className="m-4">
        <FeaturesHighlight />
      </div>

      {/* Stat Boxes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 m-4 max-w-4xl mx-auto">
        <StatBox icon={FaTools} label="Requests" value={mockRequests.length} bgColor="bg-blue-600" />
        <StatBox icon={FaMoneyBillWave} label="Payments Due" value={1} bgColor="bg-red-500" />
        <StatBox icon={FaCommentDots} label="Messages" value={mockMessages.length} bgColor="bg-yellow-500" />
        <StatBox icon={FaUser} label="Properties" value={2} bgColor="bg-green-600" />
      </div>

      {/* Maintenance Requests */}
      <section className="bg-white dark:bg-gray-800 p-4 rounded shadow m-4 max-w-4xl mx-auto">
        <h3 className="text-lg font-semibold mb-4">Recent Maintenance Requests</h3>
        <ul className="space-y-2">
          {mockRequests.map((req) => (
            <li key={req.id} className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">{req.type}</p>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {dayjs(req.date).format("MMM D, YYYY")}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium ${
                    req.urgency === "High"
                      ? "bg-red-100 text-red-700"
                      : req.urgency === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {req.urgency}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium ${
                    req.status === "Completed"
                      ? "bg-green-200 text-green-800"
                      : req.status === "Pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-blue-200 text-blue-800"
                  }`}
                >
                  {req.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Messages */}
      <section className="bg-white dark:bg-gray-800 p-4 rounded shadow m-4 max-w-4xl mx-auto">
        <h3 className="text-lg font-semibold mb-4">Recent Messages</h3>
        <ul className="space-y-2">
          {mockMessages.map((msg) => (
            <li key={msg.id} className="border-b pb-2">
              <p className="font-medium">
                {msg.from}:{" "}
                <span className="text-gray-600 dark:text-gray-300 font-normal">
                  {msg.message}
                </span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {dayjs(msg.time).format("MMM D, h:mm A")}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Rating Form - only show if landlordId is known */}
      {landlordId && (
        <div className="max-w-4xl mx-auto">
          <RatingForm targetUserId={landlordId} targetUserType="landlord" />
        </div>
      )}

      {/* Voice Commands */}
      <div className="m-4 max-w-4xl mx-auto">
        <VoiceCommand />
      </div>

      {/* Chatbot - floating */}
      {showChatbot && (
        <div className="fixed bottom-5 right-5 w-full max-w-sm z-50">
          <Chatbot />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
