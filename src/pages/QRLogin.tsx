import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { GlobalLanguageSelector } from "@/components/GlobalLanguageSelector";
import { ReactiveMultilingualText } from "@/components/ReactiveMultilingualText";
import { useGlobalTranslation } from "@/hooks/useGlobalTranslation";

const QRLogin = () => {
  const [stayLoggedIn, setStayLoggedIn] = useState(true);
  const navigate = useNavigate();
  const { t } = useGlobalTranslation();

  const handlePhoneLogin = () => {
    navigate("/login/phone");
  };

  const handleQRClick = () => {
    // Simulate QR code scan - set authentication and navigate to dashboard
    localStorage.setItem("user-authenticated", "true");
    navigate("/dashboard");
  };

  // QR code for EasyDo 365 login
  const qrCodeUrl =
    "https://cdn.builder.io/api/v1/image/assets%2Fc2392628841448619e48c27256156253%2F9024fc767b9c4d6180867e834ee9d9d6?format=webp&width=800";

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      {/* Language Selector - Top Right */}
      <GlobalLanguageSelector position="absolute" showGlobe={true} size="md" />

      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-3xl shadow-lg p-10 space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F835d6476d6ca471fa2644819d467705d%2F25940a1f71ae4cef84e1ed5bdab9a460?format=webp&width=800"
              alt="EasyDo Logo"
              className="h-16 w-auto"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Steps */}
            <div className="space-y-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-8">
                <ReactiveMultilingualText translationKey="stepsToLogin" />
              </h1>

              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
                    1
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900 font-medium">
                        <ReactiveMultilingualText translationKey="openEasyDo365" />
                      </span>
                      <div className="w-6 h-6 rounded-md flex items-center justify-center overflow-hidden">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets%2Fc2392628841448619e48c27256156253%2F06958a7672024948a214dd571741d895?format=webp&width=800"
                          alt="EasyDo 365"
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                      <span className="text-gray-600 text-sm">
                        <ReactiveMultilingualText translationKey="onYourPhone" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
                    2
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900">
                        <ReactiveMultilingualText translationKey="onAndroidTapMenu" />
                      </span>
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">·</span>
                      <span className="text-gray-900">
                        <ReactiveMultilingualText translationKey="onIPhoneTapSettings" />
                      </span>
                      <svg
                        className="w-4 h-4 text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
                    3
                  </div>
                  <div>
                    <span className="text-gray-900">
                      <ReactiveMultilingualText translationKey="tapLinkedDevices" />
                    </span>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
                    4
                  </div>
                  <div>
                    <span className="text-gray-900">
                      <ReactiveMultilingualText translationKey="scanQRToConfirm" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Stay logged in */}
              <div className="flex items-center gap-3 pt-4">
                <Checkbox
                  id="stayLoggedIn"
                  checked={stayLoggedIn}
                  onCheckedChange={(checked) =>
                    setStayLoggedIn(checked === true)
                  }
                  className="rounded border-gray-300"
                />
                <label
                  htmlFor="stayLoggedIn"
                  className="text-sm text-gray-700 flex items-center gap-2"
                >
                  <span>✓</span>
                  <ReactiveMultilingualText translationKey="stayLoggedIn" />
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </label>
              </div>

              {/* Phone login link */}
              <div className="pt-4">
                <button
                  onClick={handlePhoneLogin}
                  className="text-gray-700 hover:text-gray-900 text-sm font-medium underline underline-offset-2 hover:underline-offset-4 transition-all"
                >
                  <ReactiveMultilingualText translationKey="logInWithPhoneInstead" />
                </button>
              </div>
            </div>

            {/* Right side - QR Code */}
            <div className="flex justify-center lg:justify-end">
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <button
                  onClick={handleQRClick}
                  className="transition-transform hover:scale-105 active:scale-95"
                  title="Click to simulate QR scan and login"
                >
                  <img
                    src={qrCodeUrl}
                    alt="QR Code for EasyDo 365 Login"
                    className="w-48 h-48 object-contain cursor-pointer"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRLogin;
