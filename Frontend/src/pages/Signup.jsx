import React, { useState } from "react";
import { isValidEmail } from "../utils/helper";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please Enter your name!");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
  };
  return (
    <motion.div
      initial={{ filter: "blur(10px)", opacity: 0 }}
      animate={{ filter: "blur(0px)", opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen flex flex-col md:flex-row items-stretch bg-[#f3f6d9]"
    >
      <div className="w-full md:w-1/2">
        <img
          src="../public/signupv.jpg"
          alt="Signup Visual"
          className="w-full h-auto md:h-full md:object-cover"
        />
      </div>

      {/* Signup Form Section */}
      <div className="flex items-center justify-center w-full md:w-1/2">
        <div className="p-8 w-full max-w-md">
          <h2 className="text-3xl font-semibold font-mono tracking-tighter text-center text-black mb-6">
            Create Account
          </h2>
          <form onSubmit={handleSignUp} className="space-y-4">
            <input
              className="w-full px-4 py-2 text-black border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="w-full px-4 py-2 text-black border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="w-full px-4 py-2 text-black border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Username"
              type="text"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="w-full px-4 py-2 text-black border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              type="password"
              required
            />
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Signup;
