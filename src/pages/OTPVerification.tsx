import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { translations, type Language } from "@/data/translations";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { MultilingualText } from "@/components/MultilingualText";

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [hasResent, setHasResent] = useState(false);
  const { language, setLanguage } = useLanguageContext();
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

  // Timer effect for resend functionality
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

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
    if (canResend) {
      // Reset OTP input
      setOtp("");
      // Reset timer
      setTimeLeft(60);
      setCanResend(false);
      setHasResent(true);
      // In a real app, this would trigger API call to resend OTP
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: "#eff4ff" }}
    >
      {/* Language Selector - Top Right */}
      <LanguageSelector position="absolute" showGlobe={true} size="md" />
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
            <MultilingualText
              as="h1"
              className="text-xl font-semibold text-gray-900"
            >
              {t("enterOTP")}
            </MultilingualText>
            <MultilingualText as="p" className="text-sm text-gray-700">
              {hasResent ? t("resendTo") : t("sentTo")} {maskedNumber}
            </MultilingualText>
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
              <MultilingualText
                as="button"
                onClick={handleResendOTP}
                disabled={!canResend}
                className={cn(
                  "text-sm transition-colors",
                  canResend
                    ? "text-blue-600 hover:underline cursor-pointer"
                    : "text-gray-500 cursor-not-allowed",
                )}
              >
                {canResend
                  ? t("resendOTP")
                  : `${t("resendOTPIn")} ${timeLeft} ${t("seconds")}`}
              </MultilingualText>
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
              getMultilingualTextClass(language),
            )}
          >
            {t("verifyOTP")}
          </Button>

          {/* Back to Login */}
          <div className="text-center">
            <button
              onClick={() => navigate("/login")}
              className={cn(
                "text-sm text-gray-500 hover:text-gray-700 transition-colors",
                getMultilingualTextClass(language),
              )}
            >
              {t("backToLogin")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
