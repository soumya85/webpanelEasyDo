import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { translations, type Language } from "@/data/translations";

const Login = () => {
  const [countryCode, setCountryCode] = useState("+91");
  const [mobileNumber, setMobileNumber] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [language, setLanguage] = useState<Language>("English");
  const navigate = useNavigate();

  const isFormValid = mobileNumber.length === 10 && acceptedTerms;

  // Get translation function for current language
  const t = (key: keyof typeof translations.English) =>
    translations[language][key];

  const handleSendOTP = () => {
    if (isFormValid) {
      navigate("/otp-verification", {
        state: {
          mobileNumber: `${countryCode} ${mobileNumber}`,
          maskedNumber: `${countryCode} ${mobileNumber.slice(0, 2)}${"*".repeat(6)}${mobileNumber.slice(-2)}`,
        },
      });
    }
  };

  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow digits
    if (value.length <= 10) {
      setMobileNumber(value);
    }
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
            <SelectItem value="Urdu">ار��و (Urdu)</SelectItem>
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

          {/* Welcome Heading */}
          <div className="text-center">
            <h1 className="text-xl font-semibold text-gray-900">
              {t("welcomeToEasyDo")}
            </h1>
          </div>

          {/* Mobile Number Input Section */}
          <div className="space-y-4">
            <div className="flex gap-3">
              {/* Country Code Selector */}
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className="w-20 border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+91">🇮🇳 +91</SelectItem>
                  <SelectItem value="+1">🇺🇸 +1</SelectItem>
                  <SelectItem value="+44">🇬🇧 +44</SelectItem>
                  <SelectItem value="+971">🇦🇪 +971</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Number Input */}
              <Input
                type="tel"
                placeholder={t("mobileNumberPlaceholder")}
                value={mobileNumber}
                onChange={handleMobileNumberChange}
                className="flex-1 border-gray-200 focus:border-primary focus:ring-primary"
                maxLength={10}
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="terms"
              checked={acceptedTerms}
              onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
              className="mt-1"
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-600 leading-relaxed"
            >
              {t("bySigningUp")}{" "}
              <a href="#" className="text-primary hover:underline">
                {t("termsAndConditions")}
              </a>{" "}
              {t("and")}{" "}
              <a href="#" className="text-primary hover:underline">
                {t("privacyPolicy")}
              </a>
            </label>
          </div>

          {/* Send OTP Button */}
          <Button
            onClick={handleSendOTP}
            disabled={!isFormValid}
            className={cn(
              "w-full h-12 text-base font-semibold rounded-lg transition-all duration-200",
              isFormValid
                ? "bg-primary hover:bg-primary-600 text-white"
                : "bg-gray-300 text-gray-400 cursor-not-allowed border-0 disabled:opacity-100",
            )}
          >
            {t("sendOTP")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
