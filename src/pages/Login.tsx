import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const isFormValid = email.includes("@") && email.includes(".");

  const handleSubmit = () => {
    if (isFormValid) {
      navigate("/otp-verification", {
        state: {
          email: email,
          maskedEmail: `${email.split("@")[0].slice(0, 2)}${"*".repeat(4)}@${email.split("@")[1]}`,
        },
      });
    }
  };

  const handleGoogleLogin = () => {
    // In a real app, this would integrate with Google OAuth
    console.log("Google login clicked");
    // For demo, directly navigate to dashboard
    localStorage.setItem("user-authenticated", "true");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 via-purple-500 to-teal-400 rounded-2xl flex items-center justify-center transform rotate-12">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F835d6476d6ca471fa2644819d467705d%2F25940a1f71ae4cef84e1ed5bdab9a460?format=webp&width=800"
                  alt="EasyDo Logo"
                  className="h-10 w-10 brightness-0 invert"
                />
              </div>
            </div>
          </div>

          {/* Welcome Heading */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome to EasyDo
            </h1>
            <p className="text-gray-600 text-sm">
              Your Gateway to Intelligent Interaction
            </p>
          </div>

          {/* Email Input Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 transition-colors"
              />
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={cn(
                "w-full h-12 text-base font-semibold rounded-lg transition-all duration-200",
                isFormValid
                  ? "bg-gradient-to-r from-purple-500 to-teal-400 hover:from-purple-600 hover:to-teal-500 text-white border-0"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed border-0",
              )}
            >
              Submit
            </Button>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/otp-verification")}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Login
                </button>
              </p>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">
                  or continue with
                </span>
              </div>
            </div>

            {/* Google Login Button */}
            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full h-12 border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-gray-700 font-medium">
                  Google account
                </span>
              </div>
            </Button>
          </div>

          {/* Terms and Privacy */}
          <div className="text-center space-y-1">
            <p className="text-xs text-gray-500 leading-relaxed">
              By clicking "Submit", you agree to EasyDo's{" "}
              <a href="#" className="text-blue-600 hover:underline">
                User Agreement
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
              ,<br />
              we prioritize your privacy and trust, guiding you through
              innovative interactions while
              <br />
              safeguarding your personal information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
