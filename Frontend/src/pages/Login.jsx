import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { isValidEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError("");

    //api call
    try {
      const response = await axiosInstance.post("/api/v1/login", {
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Something unexpected happened!");
      }
    }
  };

  return (
    <motion.div
      initial={{ filter: "blur(10px)", opacity: 0 }}
      animate={{ filter: "blur(0px)", opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen flex flex-col md:flex-row items-stretch bg-[#F3F6D9]"
    >
      <div className="w-full md:w-1/2">
        <img
          src="../public/loginv.jpg"
          alt="Login Visual"
          className="w-full h-auto md:h-full md:object-cover"
        />
      </div>

      <div className="flex items-center justify-center w-full md:w-1/2">
        <div className="p-8 w-full max-w-md">
          <h2 className="text-3xl font-semibold font-mono tracking-tighter text-center text-black mb-6">
            Welcome Back
          </h2>
          <form onSubmit={handlelogin} className="space-y-4">
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
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              Don’t have an account?{" "}
              <a href="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
