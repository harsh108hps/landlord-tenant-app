import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#111827] flex items-center justify-center px-4 relative">
      {/* Animated background glows */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-500 opacity-40 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-400 opacity-30 rounded-full filter blur-2xl animate-ping"></div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="z-10 bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-10 max-w-3xl w-full shadow-2xl text-center border border-white/20"
      >
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 bg-clip-text text-transparent tracking-tight drop-shadow-xl"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          Welcome to RentEase
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-red font-semibold mb-8 leading-relaxed drop-shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Simplify rent, repairs & relationships between tenants and landlords — all in one beautiful, fast, and reliable platform.
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Link
            to="/signup"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-black font-bold shadow-lg hover:scale-105 transition duration-200"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="px-6 py-3 rounded-full border-2 border-yellow-400 text-yellow-300 font-semibold hover:bg-yellow-400 hover:text-black transition duration-200"
          >
            Login
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
