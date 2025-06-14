import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("tenant");  // <-- Role select state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Show welcome message
      alert(`🎉 Welcome! Redirecting to your ${role} dashboard...`);

      // Redirect based on selected role
      if (role === "tenant") {
        navigate("/tenantdashboard");
      } else {
        navigate("/landlorddashboard");
      }
    } catch (err) {
      console.error("Login Error:", err.message);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-100 to-blue-200">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">Log In</h2>

        {error && (
          <div className="mb-4 text-red-600 bg-red-100 p-2 rounded">{error}</div>
        )}

        <label className="block mb-2 font-medium text-blue-900">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 border border-blue-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block mb-2 font-medium text-blue-900">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 border border-blue-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block mb-2 font-medium text-blue-900">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 border border-blue-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="tenant">Tenant</option>
          <option value="landlord">Landlord</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-700 text-white font-semibold w-full p-3 rounded hover:bg-blue-800 transition"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        <p className="text-center text-sm mt-5 text-blue-700">
          Don’t have an account?{" "}
          <Link to="/signup" className="underline hover:text-blue-900 font-medium">
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
