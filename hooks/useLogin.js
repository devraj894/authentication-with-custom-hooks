import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = ({ email, password }) => {
    setLoading(true);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          if (!email || !password) {
            toast.error("All fields are required!");
            setLoading(false);
            return reject("All fields are required!");
          }

          const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

          const user = storedUsers.find(
            (u) =>
              u.email.toLowerCase() === email.toLowerCase() &&
              u.password === password
          );

          if (!user) {
            toast.error("Invalid email or password.");
            setLoading(false);
            return reject("Invalid credentials.");
          }

          localStorage.setItem("currentUser", JSON.stringify(user));

          toast.success("Login successful!");
          setLoading(false);

          router.push("/");
          return resolve(user);
        } catch (err) {
          toast.error("Something went wrong. Please Try again.");
          setLoading(false);
          return reject("Unexpected error.");
        }
      }, 500);
    });
  };

  return { login, loading };
}
