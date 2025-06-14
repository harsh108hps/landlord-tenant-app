// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard"; // Tenant Dashboard
import LandlordDashboard from "../pages/LandlordDashboard";
import Maintenance from "../pages/Maintenance";
import PaymentHistory from "../pages/PaymentHistory";
import IssueTracker from "../pages/IssueTracker";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Tenant Dashboard */}
      <Route path="/tenant/dashboard" element={<Dashboard />} />

      {/* Landlord Dashboard */}
      <Route path="/landlord/dashboard" element={<LandlordDashboard />} />

      {/* Optional other pages */}
      <Route path="/maintenance" element={<Maintenance />} />
      <Route path="/payments" element={<PaymentHistory />} />
      <Route path="/issues" element={<IssueTracker />} />
      <Route path="/profile" element={<TenantProfile />} />
<Route path="/landlord-console" element={<LandlordConsole />} />
    </Routes>
  );
};

export default AppRoutes;
