"use client";

import Link from "next/link.js";
import { useState } from "react";
import { useSignup } from "../../hooks/useSignup.js";

export default function SignupForm() {
  // Form state
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Custom hook
  const { signup, loading } = useSignup();

  // Updates the form state
  const handleChange = (e) => {
    setSignupData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handles the form submission for Signup
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(signupData);
      setSignupData({ email: "", password: "", confirmPassword: "" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0F172A]">
      <div className="w-full max-w-md p-10 bg-white rounded-3xl shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500">
          Sign Up
        </h2>

        <form onSubmit={handleSignupSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition shadow-sm"
            value={signupData.email}
            onChange={handleChange}
            disabled={loading}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Your Password (min 8 chars)"
            className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition shadow-sm"
            value={signupData.password}
            onChange={handleChange}
            disabled={loading}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Your Password"
            className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition shadow-sm"
            value={signupData.confirmPassword}
            onChange={handleChange}
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:scale-105 transform transition disabled:opacity-60 shadow-lg flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-500 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
