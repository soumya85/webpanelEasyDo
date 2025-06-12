import { Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <PageLayout>
      <div className="p-6">
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
              <span className="text-2xl font-bold">404</span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-azure-24 mb-4">
            Page Not Found
          </h1>

          <p className="text-gray-600 max-w-md mx-auto mb-8">
            The page you're looking for doesn't exist or has been moved to a
            different location.
          </p>

          <Button asChild>
            <Link to="/" className="gap-2">
              <Home className="h-4 w-4" />
              Go back home
            </Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFound;
