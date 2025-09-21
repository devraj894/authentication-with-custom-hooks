"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Email validation
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Password validation
  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  // Signup
  const signup = ({ email, password, confirmPassword }) => {
    setLoading(true);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          if (!email || !password || !confirmPassword) {
            toast.error("All fields are required!");
            setLoading(false);
            return reject("All fields are required!");
          }

          if (!isValidEmail(email)) {
            toast.error("Please enter a valid email address.");
            setLoading(false);
            return reject("Invalid email.");
          }

          if (!isValidPassword(password)) {
            toast.error("Password must be at least 8 characters.");
            setLoading(false);
            return reject("Weak password.");
          }

          if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            setLoading(false);
            return reject("Password mismatch.");
          }

          const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

          const userExists = storedUsers.some(
            (user) => user.email.toLowerCase() === email.toLowerCase()
          );
          if (userExists) {
            toast.error("User already exists. Try logging in.");
            setLoading(false);
            return reject("User already exists.");
          }

          const newUser = { email, password };
          const updatedUsers = [...storedUsers, newUser];
          localStorage.setItem("users", JSON.stringify(updatedUsers));

          toast.success("Signup successful!");
          setLoading(false);
          router.push("/login");
          return resolve(newUser);
        } catch (err) {
          toast.error("Something went wrong. Please Try again.");
          setLoading(false);
          return reject("Unexpected error.");
        }
      }, 500);
    });
  };

  return { signup, loading };
}
