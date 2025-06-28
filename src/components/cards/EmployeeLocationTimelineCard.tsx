import {
  Search,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  MapPin,
  Satellite,
  Map as MapIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useMemo, useState, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

export default function EmployeeLocationTimelineCard() {
  // State to track the current time window offset
  const [windowOffset, setWindowOffset] = useState(0);
  // State to track single selected time slot (current time as initial selection)
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  // State for custom interactive map
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(5);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  // Google Maps state
  const [mapType, setMapType] = useState<"custom" | "google">("google");
  const [googleMapType, setGoogleMapType] = useState<
    "roadmap" | "satellite" | "hybrid" | "terrain"
  >("terrain");
  const [googleZoom, setGoogleZoom] = useState(5);
  const [selectedGoogleMarker, setSelectedGoogleMarker] = useState<
    string | null
  >(null);

  // Branch locations data with both pixel positions for custom map and real coordinates for Google Maps
  const branches = [
    {
      id: "6",
      name: "New Delhi Branch",
      position: { x: 300, y: 140 },
      coordinates: { lat: 28.6139, lng: 77.209 },
      address: "New Delhi",
      employees: 15,
    },
    {
      id: "0",
      name: "Ahmedabad Office Branch",
      position: { x: 180, y: 230 },
      coordinates: { lat: 23.0225, lng: 72.5714 },
      address: "Ahmedabad, Gujarat",
      employees: 8,
    },
    {
      id: "18",
      name: "Haldia Branch",
      position: { x: 460, y: 220 },
      coordinates: { lat: 22.0667, lng: 88.1167 },
      address: "Haldia, West Bengal",
      employees: 12,
    },
    {
      id: "22",
      name: "Paradip Branch",
      position: { x: 380, y: 280 },
      coordinates: { lat: 20.3167, lng: 86.6167 },
      address: "Paradip, Odisha",
      employees: 18,
    },
  ];

  // Google Maps configuration
  const googleMapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: true,
    mapTypeControl: true,
    fullscreenControl: true,
    styles: [], // Use default Google Maps styling
  };

  // Calculate center point of all branches for Google Maps
  const googleMapCenter = useMemo(() => {
    const avgLat =
      branches.reduce((sum, branch) => sum + branch.coordinates.lat, 0) /
      branches.length;
    const avgLng =
      branches.reduce((sum, branch) => sum + branch.coordinates.lng, 0) /
      branches.length;
    return { lat: avgLat, lng: avgLng };
  }, [branches]);

  // Define all possible time slots
  const allSlots = useMemo(
    () => [
      { time: "1 AM", hour: 1 },
      { time: "2 AM", hour: 2 },
      { time: "3 AM", hour: 3 },
      { time: "4 AM", hour: 4 },
      { time: "5 AM", hour: 5 },
      { time: "6 AM", hour: 6 },
      { time: "7 AM", hour: 7 },
      { time: "8 AM", hour: 8 },
      { time: "9 AM", hour: 9 },
      { time: "10 AM", hour: 10 },
      { time: "11 AM", hour: 11 },
      { time: "12 PM", hour: 12 },
      { time: "1 PM", hour: 13 },
      { time: "2 PM", hour: 14 },
      { time: "3 PM", hour: 15 },
      { time: "4 PM", hour: 16 },
      { time: "5 PM", hour: 17 },
      { time: "6 PM", hour: 18 },
      { time: "7 PM", hour: 19 },
      { time: "8 PM", hour: 20 },
      { time: "9 PM", hour: 21 },
      { time: "10 PM", hour: 22 },
      { time: "11 PM", hour: 23 },
      { time: "12 AM", hour: 0 }, // Midnight
    ],
    [],
  );

  // Calculate current time slots based on window offset
  const { timeSlots, currentHour, canGoPrevious, canGoNext } = useMemo(() => {
    const now = new Date();
    const currentHour = now.getHours();

    // Set current time as initial selection if no selection exists
    if (selectedHour === null) {
      setSelectedHour(currentHour);
    }

    // Find the current active hour slot
    const activeSlotIndex = allSlots.findIndex(
      (slot) => slot.hour === currentHour,
    );

    // Calculate the base start index (centered around current time)
    let baseStartIndex = Math.max(0, activeSlotIndex - 4);

    // Apply window offset
    let startIndex = Math.max(0, baseStartIndex + windowOffset);
    let endIndex = Math.min(allSlots.length, startIndex + 8);

    // Adjust if we don't have enough slots at the end
    if (endIndex - startIndex < 8) {
      startIndex = Math.max(0, endIndex - 8);
    }

    // Get the 8-hour window
    const windowSlots = allSlots.slice(startIndex, endIndex);

    // Set active state for each slot (only if current hour is in this window)
    const timeSlots = windowSlots.map((slot) => ({
      time: slot.time,
      active: slot.hour === currentHour,
    }));

    // Check if we can navigate
    const canGoPrevious = startIndex > 0;
    const canGoNext = endIndex < allSlots.length;

    return { timeSlots, currentHour, canGoPrevious, canGoNext };
  }, [allSlots, windowOffset]);

  // Navigation handlers
  const handlePrevious = () => {
    if (canGoPrevious) {
      setWindowOffset((offset) => offset - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setWindowOffset((offset) => offset + 1);
    }
  };

  // Custom map interaction handlers
  const handleMarkerClick = useCallback(
    (branchId: string) => {
      setSelectedMarker(selectedMarker === branchId ? null : branchId);
    },
    [selectedMarker],
  );

  const handleMapClick = useCallback(() => {
    setSelectedMarker(null);
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(prev + 1, 10));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - mapPosition.x,
        y: e.clientY - mapPosition.y,
      });
    },
    [mapPosition],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        setMapPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    },
    [isDragging, dragStart],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Google Maps handlers
  const handleGoogleMarkerClick = useCallback(
    (branchId: string) => {
      setSelectedGoogleMarker(
        selectedGoogleMarker === branchId ? null : branchId,
      );
    },
    [selectedGoogleMarker],
  );

  const handleMapTypeToggle = useCallback(() => {
    setMapType(mapType === "custom" ? "google" : "custom");
    // Reset selection when switching map types
    setSelectedMarker(null);
    setSelectedGoogleMarker(null);
  }, [mapType]);

  const handleGoogleMapTypeChange = useCallback(
    (type: "roadmap" | "satellite" | "hybrid" | "terrain") => {
      setGoogleMapType(type);
    },
    [],
  );

  return (
    <Card className="bg-white border border-gray-200 shadow-sm h-full overflow-hidden">
      <CardContent className="p-2 flex flex-col h-full">
        {/* Header */}
        <h2 className="text-lg font-semibold text-gray-900 mb-2 px-2">
          Employee Location Timeline
        </h2>

        {/* Main Content Container - White rounded card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-2">
          {/* Date and Status Row */}
          <div className="flex items-center justify-between px-4 py-2 text-sm border-b border-gray-100">
            <span className="text-gray-600 font-medium">
              Today (Sat, 28 Jun 2025) IST
            </span>
            <span className="text-gray-900 font-semibold">Present</span>
          </div>

          {/* All Branches Section */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
            <div className="flex items-center gap-3">
              {/* Building Icon */}
              <div className="w-7 h-7 bg-red-500 rounded flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
                </svg>
              </div>
              <span className="font-semibold text-gray-900">All Branches</span>
            </div>
            <div className="flex items-center gap-2">
              {/* Chart Icon */}
              <svg
                className="w-4 h-4 text-blue-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z" />
              </svg>
              <span className="text-2xl font-bold text-gray-900">29</span>
            </div>
          </div>

          {/* Search Box */}
          <div className="px-4 py-2 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Enter employee name"
                className="w-full pl-10 pr-4 py-2 text-sm border-0 rounded-lg bg-gray-100 text-gray-500 placeholder-gray-400 focus:outline-none"
                disabled
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="px-4 py-2">
            <div className="relative mb-3">
              {/* Timeline Background Bar */}
              <div className="absolute top-2 left-0 right-0 h-0.5 bg-gray-300"></div>

              {/* Timeline Active Segments */}
              <div className="absolute top-2 left-0 right-0 flex">
                {timeSlots.slice(0, -1).map((slot, index) => {
                  const selectedIndex =
                    selectedHour !== null
                      ? timeSlots.findIndex(
                          (s) =>
                            allSlots.find((as) => as.time === s.time)?.hour ===
                            selectedHour,
                        )
                      : -1;

                  const shouldShowGreen =
                    selectedIndex >= 0 && index < selectedIndex;
                  const segmentWidth = `${100 / (timeSlots.length - 1)}%`;

                  return (
                    <div
                      key={index}
                      className="relative"
                      style={{ width: segmentWidth }}
                    >
                      <div
                        className={cn(
                          "h-0.5 w-full",
                          shouldShowGreen ? "bg-green-500" : "bg-transparent",
                        )}
                      />
                    </div>
                  );
                })}
              </div>
              {/* Timeline Dots */}
              <div className="flex justify-between items-center relative">
                {timeSlots.map((slot, index) => {
                  const slotHour = allSlots.find(
                    (as) => as.time === slot.time,
                  )?.hour;
                  const isSelected = selectedHour === slotHour;

                  return (
                    <div key={slot.time} className="flex flex-col items-center">
                      <button
                        onClick={() => {
                          if (slotHour !== undefined) {
                            setSelectedHour(slotHour);
                          }
                        }}
                        className={cn(
                          "rounded-full z-10 relative transition-all duration-200 hover:scale-110 cursor-pointer",
                          isSelected
                            ? "w-4 h-4 bg-green-500"
                            : "w-3 h-3 bg-gray-400",
                        )}
                      />
                      <span
                        className={cn(
                          "text-xs mt-2 font-medium whitespace-nowrap transition-colors duration-200",
                          isSelected
                            ? "text-green-600 font-semibold"
                            : "text-gray-500",
                        )}
                      >
                        {slot.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Controls - Below Timeline */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={!canGoPrevious}
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors",
                  canGoPrevious
                    ? "text-gray-600 hover:text-gray-800 cursor-pointer"
                    : "text-gray-400 cursor-not-allowed",
                )}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={!canGoNext}
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors",
                  canGoNext
                    ? "text-gray-600 hover:text-gray-800 cursor-pointer"
                    : "text-gray-400 cursor-not-allowed",
                )}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Map Type Toggle Controls */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleMapTypeToggle}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
                mapType === "custom"
                  ? "bg-blue-100 text-blue-700 border border-blue-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200",
              )}
            >
              <MapIcon className="w-4 h-4" />
              Custom Map
            </button>
            <button
              onClick={handleMapTypeToggle}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
                mapType === "google"
                  ? "bg-blue-100 text-blue-700 border border-blue-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200",
              )}
            >
              <MapPin className="w-4 h-4" />
              Google Maps
            </button>
          </div>

          {/* Google Maps Type Controls */}
          {mapType === "google" && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleGoogleMapTypeChange("roadmap")}
                className={cn(
                  "px-2 py-1 text-xs rounded transition-colors",
                  googleMapType === "roadmap"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300",
                )}
              >
                Road
              </button>
              <button
                onClick={() => handleGoogleMapTypeChange("satellite")}
                className={cn(
                  "px-2 py-1 text-xs rounded transition-colors",
                  googleMapType === "satellite"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300",
                )}
              >
                <Satellite className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleGoogleMapTypeChange("hybrid")}
                className={cn(
                  "px-2 py-1 text-xs rounded transition-colors",
                  googleMapType === "hybrid"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300",
                )}
              >
                Hybrid
              </button>
              <button
                onClick={() => handleGoogleMapTypeChange("terrain")}
                className={cn(
                  "px-2 py-1 text-xs rounded transition-colors",
                  googleMapType === "terrain"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300",
                )}
              >
                Terrain
              </button>
            </div>
          )}
        </div>

        {/* Maps Container */}
        <div className="relative flex-1 min-h-80 rounded-xl overflow-hidden border border-gray-200">
          {mapType === "google" ? (
            /* Google Maps Implementation */
            import.meta.env.VITE_GOOGLE_MAPS_API_KEY ? (
              <LoadScript
                googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                loadingElement={
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                      <p className="text-sm text-gray-600">
                        Loading Google Maps...
                      </p>
                    </div>
                  </div>
                }
              >
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={googleMapCenter}
                zoom={googleZoom}
                options={{
                  ...googleMapOptions,
                  mapTypeId: googleMapType,
                }}
                onZoomChanged={() => {
                  // Handle zoom changes if needed
                }}
              >
                {/* Branch Markers */}
                {branches.map((branch) => (
                  <div key={branch.id}>
                    <Marker
                      position={branch.coordinates}
                      onClick={() => handleGoogleMarkerClick(branch.id)}
                      icon={{
                        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                          <svg width="32" height="48" viewBox="0 0 32 48" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                              <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                                <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/>
                              </filter>
                            </defs>
                            <path d="M16 0C7.163 0 0 7.163 0 16C0 28 16 48 16 48S32 28 32 16C32 7.163 24.837 0 16 0Z" fill="#EA4335" filter="url(#shadow)"/>
                            <circle cx="16" cy="16" r="11" fill="#FFFFFF"/>
                            <circle cx="16" cy="16" r="10" fill="#FFFFFF" stroke="#EA4335" stroke-width="0.5"/>
                            <text x="16" y="21" text-anchor="middle" fill="#EA4335" font-size="12" font-weight="bold" font-family="Roboto,Arial,sans-serif">${branch.id}</text>
                          </svg>
                        `),
                        scaledSize: { width: 32, height: 48 },
                        anchor: { x: 16, y: 48 },
                      }}
                    />
                  </div>
                ))}

                {/* Info Window */}
                {selectedGoogleMarker && (
                  <InfoWindow
                    position={
                      branches.find((b) => b.id === selectedGoogleMarker)
                        ?.coordinates
                    }
                    onCloseClick={() => setSelectedGoogleMarker(null)}
                  >
                    <div className="p-2">
                      {(() => {
                        const branch = branches.find(
                          (b) => b.id === selectedGoogleMarker,
                        );
                        return branch ? (
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {branch.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-1">
                              {branch.address}
                            </p>
                            <p className="text-sm text-blue-600">
                              {branch.employees} employees present
                            </p>
                          </div>
                        ) : null;
                      })()}
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
          ) : (
            /* Custom Map Implementation */
            <div
              className="relative w-full h-full"
              style={{ backgroundColor: "#AAD3DF" }}
            >
              <div
                className="relative w-full h-full cursor-grab select-none"
                style={{
                  transform: `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${0.8 + (zoomLevel - 1) * 0.1})`,
                  transformOrigin: "center center",
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onClick={handleMapClick}
              >
                {/* Custom SVG Map */}
                <svg
                  viewBox="0 0 600 400"
                  className="absolute inset-0 w-full h-full"
                  style={{ backgroundColor: "#AAD3DF" }}
                >
                  <rect width="600" height="400" fill="#AAD3DF" />

                  {/* India Land Mass */}
                  <path
                    d="M200 120 L220 100 L280 95 L350 90 L420 110 L480 130 L520 170 L550 210 L580 270 L590 330 L580 390 L560 440 L520 470 L460 490 L400 500 L340 490 L280 470 L240 440 L200 390 L180 330 L170 270 L180 210 Z"
                    fill="#FAF9F7"
                    stroke="#E5E5E5"
                    strokeWidth="0.5"
                  />

                  {/* Vegetation Areas */}
                  <ellipse
                    cx="250"
                    cy="160"
                    rx="40"
                    ry="30"
                    fill="#C8E6C9"
                    opacity="0.7"
                  />
                  <ellipse
                    cx="380"
                    cy="180"
                    rx="45"
                    ry="35"
                    fill="#C8E6C9"
                    opacity="0.8"
                  />
                  <ellipse
                    cx="350"
                    cy="250"
                    rx="25"
                    ry="30"
                    fill="#C8E6C9"
                    opacity="0.6"
                  />
                </svg>

                {/* Map Labels */}
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-normal text-gray-800">
                    India
                  </div>
                </div>

                {/* Branch Markers */}
                {branches.map((branch) => (
                  <div
                    key={branch.id}
                    className="absolute cursor-pointer hover:scale-105 transition-transform z-10"
                    style={{
                      left: `${branch.position.x}px`,
                      top: `${branch.position.y}px`,
                      transform: "translate(-50%, -100%)",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkerClick(branch.id);
                    }}
                  >
                    <div className="relative">
                      <svg
                        width="40"
                        height="52"
                        viewBox="0 0 40 52"
                        className="drop-shadow-lg"
                      >
                        <ellipse
                          cx="20"
                          cy="48"
                          rx="8"
                          ry="3"
                          fill="rgba(0,0,0,0.2)"
                        />
                        <path
                          d="M20 0C10.5 0 3 7.5 3 17c0 12.5 17 35 17 35s17-22.5 17-35C37 7.5 29.5 0 20 0z"
                          fill="#EA4335"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                        />
                        <circle cx="20" cy="17" r="10" fill="#FFFFFF" />
                      </svg>
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          top: "6px",
                          color: "#EA4335",
                          fontSize: "14px",
                          fontWeight: "700",
                        }}
                      >
                        {branch.id}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Info Window */}
                {selectedMarker && (
                  <div
                    className="absolute z-20 bg-white rounded-lg shadow-lg border border-gray-200 p-3 min-w-48"
                    style={{
                      left: `${(branches.find((b) => b.id === selectedMarker)?.position.x || 0) + 20}px`,
                      top: `${(branches.find((b) => b.id === selectedMarker)?.position.y || 0) - 60}px`,
                    }}
                  >
                    {(() => {
                      const branch = branches.find(
                        (b) => b.id === selectedMarker,
                      );
                      return branch ? (
                        <div>
                          <button
                            onClick={() => setSelectedMarker(null)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300"
                          >
                            ×
                          </button>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {branch.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-1">
                            {branch.address}
                          </p>
                          <p className="text-sm text-blue-600">
                            {branch.employees} employees present
                          </p>
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}
              </div>

              {/* Custom Map Controls */}
              <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded text-xs text-gray-700 font-semibold shadow z-30">
                Custom Map
              </div>

              <div className="absolute bottom-4 right-4 flex flex-col bg-white rounded shadow-lg border border-gray-200 z-30">
                <button
                  onClick={handleZoomIn}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-600 border-b border-gray-200"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={handleZoomOut}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-600"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}