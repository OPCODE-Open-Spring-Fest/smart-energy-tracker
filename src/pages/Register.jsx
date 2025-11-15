import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useApp();
  const { loginUser } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ to send & receive cookies
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Save user in AuthContext
        loginUser(data.user || { email: formData.email });

        toast.success("Account created successfully! ⚡", { autoClose: 2000 });

        // ✅ Redirect after successful register
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        toast.error(data.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Register Error:", err);
      toast.error("Server not responding. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        state.theme === "dark"
          ? "bg-slate-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-2xl shadow-xl p-8 ${
          state.theme === "dark" ? "bg-slate-800" : "bg-white"
        }`}
      >
        <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">
          Create Account ⚡
        </h2>
        <p className="text-center mb-6 text-sm text-slate-400">
          Join Smart Energy Tracker and monitor power like never before.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                state.theme === "dark"
                  ? "bg-slate-700 border-slate-600 text-white"
                  : "bg-gray-50 border-gray-300 text-gray-900"
              }`}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              className={`w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                state.theme === "dark"
                  ? "bg-slate-700 border-slate-600 text-white"
                  : "bg-gray-50 border-gray-300 text-gray-900"
              }`}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                state.theme === "dark"
                  ? "bg-slate-700 border-slate-600 text-white"
                  : "bg-gray-50 border-gray-300 text-gray-900"
              }`}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className={`w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                state.theme === "dark"
                  ? "bg-slate-700 border-slate-600 text-white"
                  : "bg-gray-50 border-gray-300 text-gray-900"
              }`}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
            } transition-all p-3 rounded-md text-lg font-semibold text-white shadow-md`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
