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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  countryCodes,
  popularCountryCodes,
  type CountryCode,
} from "@/data/countryCodes";
import { GlobalLanguageSelector } from "@/components/GlobalLanguageSelector";
import { MultilingualText } from "@/components/MultilingualText";
import { getGlobalTranslation } from "@/lib/globalTranslations";

const Login = () => {
  const [countryCode, setCountryCode] = useState("+91");
  const [mobileNumber, setMobileNumber] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [open, setOpen] = useState(false);
  const isFormValid = mobileNumber.length === 10 && acceptedTerms;
  };

  // Find current country for display
  const currentCountry = countryCodes.find(
    (country) => country.dialCode === countryCode,
  ) ||
    popularCountryCodes.find((country) => country.dialCode === countryCode) || {
      flag: "🇮🇳",
      dialCode: "+91",
      name: "India",
      code: "IN",
    };

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
      <GlobalLanguageSelector position="absolute" showGlobe={true} size="md" />

      <div className="w-full max-w-lg">
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
            <MultilingualText
              as="h1"
              className="text-xl font-semibold text-gray-900"
            >
              {getGlobalTranslation("welcomeToEasyDo")}
            </MultilingualText>
          </div>

          {/* Mobile Number Input Section */}
          <div className="space-y-4">
            <div className="flex gap-3">
              {/* Country Code Selector with Search */}
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[140px] justify-between border-gray-200 text-sm hover:bg-gray-50"
                  >
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                      {currentCountry.flag} {currentCountry.dialCode}
                    </span>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search countries..." />
                    <CommandList>
                      <CommandEmpty>No country found.</CommandEmpty>

                      {/* Popular Countries */}
                      <CommandGroup heading="Popular">
                        {popularCountryCodes.map((country) => (
                          <CommandItem
                            key={`popular-${country.code}`}
                            value={`${country.name} ${country.dialCode}`}
                            onSelect={() => {
                              setCountryCode(country.dialCode);
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                countryCode === country.dialCode
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            <span className="flex items-center gap-2">
                              {country.flag} {country.dialCode}
                            </span>
                          </CommandItem>
                        ))}
                      </CommandGroup>

                      <CommandSeparator />

                      {/* All Countries */}
                      <CommandGroup heading="All Countries">
                        {countryCodes.map((country) => (
                          <CommandItem
                            key={country.code}
                            value={`${country.name} ${country.dialCode}`}
                            onSelect={() => {
                              setCountryCode(country.dialCode);
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                countryCode === country.dialCode
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            <span className="flex items-center gap-2">
                              {country.flag} {country.dialCode} - {country.name}
                            </span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {/* Mobile Number Input */}
              <Input
                type="tel"
                placeholder={getGlobalTranslation("mobileNumberPlaceholder")}
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
            <MultilingualText
              as="label"
              htmlFor="terms"
              className="text-sm text-gray-600 leading-relaxed"
            >
              {getGlobalTranslation("bySigningUp")}{" "}
              <a href="#" className="text-primary hover:underline">
                {getGlobalTranslation("termsAndConditions")}
              </a>{" "}
              {getGlobalTranslation("and")}{" "}
              <a href="#" className="text-primary hover:underline">
                {getGlobalTranslation("privacyPolicy")}
              </a>
            </MultilingualText>
          </div>

          {/* Send OTP Button */}
          <Button
            onClick={handleSendOTP}
            disabled={!isFormValid}
            className={cn(
              "w-full h-12 text-base font-semibold rounded-lg transition-all duration-200",
              isFormValid
                ? "bg-primary hover:bg-primary-600 text-white"
                : "bg-gray-300 text-[#96a0b3] cursor-not-allowed border-0 disabled:opacity-100",
            )}
          >
            <MultilingualText>{getGlobalTranslation("sendOTP")}</MultilingualText>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;