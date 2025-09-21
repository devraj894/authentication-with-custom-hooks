"use client";

import { useState, useEffect } from "react";
import { useLogout } from "../../hooks/useLogout.js";
import { useRouter } from "next/navigation";

export default function HomePage() {
  // States
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Custom hook
  const { logout, isLoggingOut } = useLogout();

  // Router to handle navigation
  const router = useRouter();

  // Checks if a user is already logged in by looking in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setCheckingAuth(false);
    } else {
      router.push("/login");
    }
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0F172A]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0F172A]">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md text-center border border-gray-200">
        <h1 className="text-3xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500">
          Welcome Back!
        </h1>
        <p className="text-gray-700 mb-6 text-lg">
          You are logged in as:
          <br />
          <span className="font-semibold text-blue-600">{user?.email}</span>
        </p>

        <button
          onClick={logout}
          disabled={isLoggingOut}
          className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 hover:scale-105 transform transition shadow-lg flex items-center justify-center gap-2"
        >
          {isLoggingOut ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </>
          ) : (
            "Logout"
          )}
        </button>
      </div>
    </div>
  );
}
