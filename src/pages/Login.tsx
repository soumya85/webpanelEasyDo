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
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 flex items-center justify-center">
              <svg
                width="64"
                height="64"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g transform="translate(50, 50)">
                  {/* Flowing star/flower petals */}
                  <path
                    d="M0,-30 C8,-20 12,-10 8,0 C12,10 8,20 0,30 C-8,20 -12,10 -8,0 C-12,-10 -8,-20 0,-30Z"
                    fill="url(#petal1)"
                    transform="rotate(0)"
                  />
                  <path
                    d="M0,-30 C8,-20 12,-10 8,0 C12,10 8,20 0,30 C-8,20 -12,10 -8,0 C-12,-10 -8,-20 0,-30Z"
                    fill="url(#petal2)"
                    transform="rotate(72)"
                  />
                  <path
                    d="M0,-30 C8,-20 12,-10 8,0 C12,10 8,20 0,30 C-8,20 -12,10 -8,0 C-12,-10 -8,-20 0,-30Z"
                    fill="url(#petal3)"
                    transform="rotate(144)"
                  />
                  <path
                    d="M0,-30 C8,-20 12,-10 8,0 C12,10 8,20 0,30 C-8,20 -12,10 -8,0 C-12,-10 -8,-20 0,-30Z"
                    fill="url(#petal4)"
                    transform="rotate(216)"
                  />
                  <path
                    d="M0,-30 C8,-20 12,-10 8,0 C12,10 8,20 0,30 C-8,20 -12,10 -8,0 C-12,-10 -8,-20 0,-30Z"
                    fill="url(#petal5)"
                    transform="rotate(288)"
                  />
                  <circle cx="0" cy="0" r="8" fill="url(#center)" />
                </g>
                <defs>
                  <linearGradient
                    id="petal1"
                    x1="0"
                    y1="-30"
                    x2="0"
                    y2="30"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#60A5FA" />
                    <stop offset="1" stopColor="#3B82F6" />
                  </linearGradient>
                  <linearGradient
                    id="petal2"
                    x1="0"
                    y1="-30"
                    x2="0"
                    y2="30"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#06B6D4" />
                    <stop offset="1" stopColor="#0891B2" />
                  </linearGradient>
                  <linearGradient
                    id="petal3"
                    x1="0"
                    y1="-30"
                    x2="0"
                    y2="30"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#3B82F6" />
                    <stop offset="1" stopColor="#1D4ED8" />
                  </linearGradient>
                  <linearGradient
                    id="petal4"
                    x1="0"
                    y1="-30"
                    x2="0"
                    y2="30"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#06B6D4" />
                    <stop offset="1" stopColor="#0284C7" />
                  </linearGradient>
                  <linearGradient
                    id="petal5"
                    x1="0"
                    y1="-30"
                    x2="0"
                    y2="30"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#60A5FA" />
                    <stop offset="1" stopColor="#2563EB" />
                  </linearGradient>
                  <radialGradient
                    id="center"
                    cx="0"
                    cy="0"
                    r="8"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FFFFFF" />
                    <stop offset="1" stopColor="#E0F2FE" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Welcome Heading */}
          <div className="text-center space-y-3 mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">
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
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={cn(
                "w-full h-12 text-white font-semibold rounded-lg transition-all duration-200 border-0",
                isFormValid
                  ? "bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 hover:from-blue-600 hover:via-purple-600 hover:to-cyan-500"
                  : "bg-gray-300 cursor-not-allowed",
              )}
            >
              Submit
            </Button>

            {/* Login Link */}
            <div className="text-center py-2">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/otp-verification")}
                  className="text-gray-900 font-medium hover:underline"
                >
                  Login
                </button>
              </p>
            </div>

            {/* Divider */}
            <div className="relative py-4">
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
              className="w-full h-12 border border-gray-200 bg-white hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center justify-center gap-3">
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
          <div className="text-center pt-6">
            <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
              By clicking "Submit", you agree to EasyDo's{" "}
              <a href="#" className="text-blue-600 hover:underline">
                User Agreement
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
              , we prioritize your privacy and trust, guiding you through
              innovative interactions while safeguarding your personal
              information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
