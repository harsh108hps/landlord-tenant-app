// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandlordDashboard from "./pages/LandlordDashboard";
import { ToastContainer } from "react-toastify";
import LandingPage from "./pages/LandingPage";
import LandlordConsole from "./pages/LandlordConsole";
import Profile from "./pages/Profile"
import ScheduleMaintenance from "./pages/ScheduleMaintenance";
import ManageAppointments from "./pages/ManageAppointments";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chatbot from './components/Chatbot';
import TipsGuidelines from "./pages/TipsGuidelines";

import Dashboard from './pages/Dashboard';
import Maintenance from './pages/Maintenance';
import IssueTracker from "./pages/IssueTracker";
import Chat from './pages/Chat';
import Payments from './pages/Payments';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20 px-4 max-w-7xl mx-auto w-full">
        <Routes>
          {/* Common Pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Tenant Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/issue" element={<IssueTracker />} />

          {/* Landlord Routes */}
          <Route path="/landlord-dashboard" element={<LandlordDashboard />} />
          <Route path="/landlord-console" element={<LandlordConsole />} />
          <Route path="/schedule-maintenance" element={<ScheduleMaintenance />} />
<Route path="/manage-appointments" element={<ManageAppointments />} />
        </Routes>
        <Routes>
  {/* ...other routes */}
  <Route path="/profile" element={<Profile />} />
  <Route path="/chatbot" element={<Chatbot />} />
  <Route path="/tips" element={<TipsGuidelines />} />
</Routes>
      </main>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
