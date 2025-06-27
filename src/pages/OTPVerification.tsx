import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { translations, type Language } from "@/data/translations";

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const [language, setLanguage] = useState<Language>("English");
  const navigate = useNavigate();
  const location = useLocation();

  const { mobileNumber, maskedNumber } = location.state || {
    mobileNumber: "+91 9876543210",
    maskedNumber: "+91 98******10",
  };

  const isOTPValid = otp.length === 6;

  // Get translation function for current language
  const t = (key: keyof typeof translations.English) =>
    translations[language][key];

  const handleVerifyOTP = () => {
    if (isOTPValid) {
      // In a real app, you would verify the OTP with the backend here
      // For demo purposes, any 6-digit OTP is valid

      // Set authentication status in localStorage
      localStorage.setItem("user-authenticated", "true");

      // Navigate to dashboard
      navigate("/dashboard");
    }
  };

  const handleResendOTP = () => {
    // Reset OTP input
    setOtp("");
    // In a real app, this would trigger API call to resend OTP
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: "#eff4ff" }}
    >
      {/* Language Selector - Top Right */}
      <div className="absolute top-6 right-6">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-auto min-w-[140px] border-gray-200 bg-white">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-500" />
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="English">English</SelectItem>
            <SelectItem value="Hindi">हिंदी (Hindi)</SelectItem>
            <SelectItem value="Bengali">বাংলা (Bengali)</SelectItem>
            <SelectItem value="Telugu">తెలుగు (Telugu)</SelectItem>
            <SelectItem value="Marathi">मराठी (Marathi)</SelectItem>
            <SelectItem value="Tamil">தமிழ் (Tamil)</SelectItem>
            <SelectItem value="Urdu">اردو (Urdu)</SelectItem>
            <SelectItem value="Gujarati">ગુજરાતી (Gujarati)</SelectItem>
            <SelectItem value="Kannada">ಕನ್ನಡ (Kannada)</SelectItem>
            <SelectItem value="Odia">ଓଡ଼ିଆ (Odia)</SelectItem>
            <SelectItem value="Punjabi">ਪੰਜਾਬੀ (Punjabi)</SelectItem>
            <SelectItem value="Malayalam">മലയാളം (Malayalam)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F835d6476d6ca471fa2644819d467705d%2F25940a1f71ae4cef84e1ed5bdab9a460?format=webp&width=800"
              alt="EasyDo Logo"
              className="h-20 w-auto"
            />
          </div>

          {/* Heading */}
          <div className="text-center space-y-2">
            <h1 className="text-xl font-semibold text-gray-900">
              Enter the 6-digit OTP
            </h1>
            <p className="text-sm text-gray-500">Sent to {maskedNumber}</p>
          </div>

          {/* OTP Input */}
          <div className="space-y-6">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
                className="gap-3"
              >
                <InputOTPGroup className="gap-3">
                  {Array.from({ length: 6 }, (_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="w-12 h-12 border-2 border-gray-200 rounded-lg text-lg font-medium focus:border-primary transition-colors"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            {/* Resend OTP */}
            <div className="text-center">
              <button
                onClick={handleResendOTP}
                className="text-sm text-primary hover:underline transition-colors"
              >
                Resend OTP
              </button>
            </div>
          </div>

          {/* Verify Button */}
          <Button
            onClick={handleVerifyOTP}
            disabled={!isOTPValid}
            className={cn(
              "w-full h-12 text-base font-semibold rounded-lg transition-all duration-200",
              isOTPValid
                ? "bg-primary hover:bg-primary-600 text-white"
                : "bg-gray-300 text-[#96a0b3] cursor-not-allowed border-0 disabled:opacity-100",
            )}
          >
            VERIFY OTP
          </Button>

          {/* Back to Login */}
          <div className="text-center">
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              ← Back to login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
