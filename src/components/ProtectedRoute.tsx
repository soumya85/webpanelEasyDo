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
      // Redirect to login if not authenticated
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  // Check authentication status
  const isAuthenticated = localStorage.getItem("user-authenticated") === "true";

  // Don't render children if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
