import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated =
      localStorage.getItem("user-authenticated") === "true";

    if (!isAuthenticated) {
      // For development/testing: auto-authenticate if not in production
      if (import.meta.env.DEV) {
        localStorage.setItem("user-authenticated", "true");
        return;
      }
      // Redirect to login if not authenticated
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  // Check authentication status
  const isAuthenticated = localStorage.getItem("user-authenticated") === "true";

  // For development: auto-authenticate
  if (!isAuthenticated && import.meta.env.DEV) {
    localStorage.setItem("user-authenticated", "true");
  }

  return <>{children}</>;
}
