import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";

export function useLogout() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      try {
        localStorage.removeItem("currentUser");

        toast.success("Logged out successfully!");
        router.push("/login");
      } catch (err) {
        toast.error("Logout failed. Please try again.");
      } finally {
        setIsLoggingOut(false);
      }
    }, 500); 
  };

  return { logout, isLoggingOut };
}
