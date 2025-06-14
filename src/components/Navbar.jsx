import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  const { t, i18n } = useTranslation();

  // Change language
  const changeLanguage = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  // Theme toggle
  const toggleDarkMode = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setRole(userSnap.data().role);
        }
      } else {
        setRole("");
      }
    });

    // Set theme on load
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <nav className="bg-blue-700 dark:bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div>
        <Link to="/" className="text-xl font-bold hover:text-yellow-300">
          🏠 RENTEASE
        </Link>
      </div>

      <div className="flex items-center space-x-5">
        {user && (
          <>
            <Link
              to={role === "landlord" ? "/landlord-dashboard" : "/dashboard"}
              className="hover:text-yellow-300"
            >
              {t("dashboard")}
            </Link>
            <Link to="/maintenance" className="hover:text-yellow-300">
              🛠 {t("maintenance")}
            </Link>
            <Link to="/payments" className="hover:text-yellow-300">
              💳 {t("payments")}
            </Link>
            <Link to="/chat" className="hover:text-yellow-300">
              💬 {t("chat")}
            </Link>
            <Link to="/issues" className="hover:text-yellow-300">
              📝 {t("issueTracker")}
            </Link>
            <Link to="/profile" className="hover:text-yellow-300">
              👤 {t("profile")}
            </Link>
          </>
        )}

        {!user && (
          <>
            <Link to="/login" className="hover:text-yellow-300">
              {t("login")}
            </Link>
            <Link to="/signup" className="hover:text-yellow-300">
              {t("signup")}
            </Link>
          </>
        )}
        <Link to="/chatbot" className="hover:text-yellow-300 font-medium">
  🤖 AI Chatbot
</Link>


        {/* 🌐 Language Switch */}
        <select
          value={i18n.language}
          onChange={changeLanguage}
          className="bg-blue-700 dark:bg-gray-800 border border-white text-white px-2 py-1 rounded text-sm"
        >
          <option value="en">🌐 EN</option>
          <option value="hi">🇮🇳 HI</option>
        </select>
        {role === "tenant" && (
  <Link to="/schedule-maintenance" className="hover:text-yellow-300 font-medium">
    📅 Schedule
  </Link>
)}

{role === "landlord" && (
  <Link to="/manage-appointments" className="hover:text-yellow-300 font-medium">
    🛠 Appointments
  </Link>
)}


        {/* 🌙 Dark Mode Toggle */}
        <button onClick={toggleDarkMode} className="text-white hover:text-yellow-300">
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {user && (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm font-semibold"
          >
            {t("logout")}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
