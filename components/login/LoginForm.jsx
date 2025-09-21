"use client";

import Link from "next/link.js";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin.js";

export default function LoginForm() {
  // Form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Custom hook
  const { login, loading } = useLogin();

  // Updates the form state
  const handleChange = (e) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handles the form submission for login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(loginData);
      setLoginData({ email: "", password: "" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0F172A]">
      <div className="w-full max-w-md p-10 bg-white rounded-3xl shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500">
          Login
        </h2>

        <form onSubmit={handleLoginSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition shadow-sm"
            value={loginData.email}
            onChange={handleChange}
            disabled={loading}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Your Password"
            className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition shadow-sm"
            value={loginData.password}
            onChange={handleChange}
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:scale-105 transform transition disabled:opacity-60 shadow-lg flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-500 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
