import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MeterNeedle } from "./meter-needle";

interface MeterProps {
  /** Current value */
  value: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Size of the meter */
  size?: "sm" | "md" | "lg" | "xl";
  /** Custom className */
  className?: string;
  /** Whether to show value labels */
  showLabels?: boolean;
  /** Whether to show the scale */
  showScale?: boolean;
  /** Color theme */
  variant?: "default" | "success" | "warning" | "danger";
  /** Custom needle color */
  needleColor?: string;
  /** Label for the meter */
  label?: string;
  /** Unit to display with the value */
  unit?: string;
  /** Whether to animate transitions */
  animated?: boolean;
  /** Type of meter - half circle or full circle */
  type?: "half" | "full";
}

const SIZE_CONFIG = {
  sm: { needle: 24, container: 120 },
  md: { needle: 34, container: 160 },
  lg: { needle: 48, container: 200 },
  xl: { needle: 64, container: 240 },
};

const VARIANT_COLORS = {
  default: "#1E3A5F",
  success: "#17C666",
  warning: "#F59E0B",
  danger: "#EA4D4D",
};

export const Meter: React.FC<MeterProps> = ({
  value,
  min = 0,
  max = 100,
  size = "md",
  className,
  showLabels = true,
  showScale = true,
  variant = "default",
  needleColor,
  label,
  unit = "%",
  animated = true,
  type = "half",
}) => {
  const sizeConfig = SIZE_CONFIG[size];
  const color = needleColor || VARIANT_COLORS[variant];

  // Clamp value between min and max
  const clampedValue = Math.max(min, Math.min(max, value));

  // Calculate rotation angle
  const range = max - min;
  const normalizedValue = (clampedValue - min) / range;
  const maxAngle = type === "half" ? 180 : 360;
  const rotation = normalizedValue * maxAngle - (type === "half" ? 90 : 0);

  // Generate scale marks
  const scaleMarks = Array.from({ length: 11 }, (_, i) => {
    const scaleValue = min + (range * i) / 10;
    const scaleAngle = (i / 10) * maxAngle - (type === "half" ? 90 : 0);
    return { value: scaleValue, angle: scaleAngle };
  });

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      {/* Label */}
      {label && (
        <div className="text-sm font-medium text-gray-700 mb-2">{label}</div>
      )}

      {/* Meter Container */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: sizeConfig.container,
          height:
            type === "half" ? sizeConfig.container / 2 : sizeConfig.container,
        }}
      >
        {/* Background Circle/Arc */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 ${sizeConfig.container} ${
            type === "half" ? sizeConfig.container / 2 : sizeConfig.container
          }`}
        >
          {/* Background arc */}
          <path
            d={
              type === "half"
                ? `M 20 ${sizeConfig.container / 2} A ${
                    sizeConfig.container / 2 - 20
                  } ${sizeConfig.container / 2 - 20} 0 0 1 ${
                    sizeConfig.container - 20
                  } ${sizeConfig.container / 2}`
                : `M ${sizeConfig.container / 2} 20 A ${
                    sizeConfig.container / 2 - 20
                  } ${sizeConfig.container / 2 - 20} 0 1 1 ${
                    sizeConfig.container / 2 - 1
                  } 20`
            }
            stroke="#E5E7EB"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />

          {/* Value arc */}
          <path
            d={
              type === "half"
                ? `M 20 ${sizeConfig.container / 2} A ${
                    sizeConfig.container / 2 - 20
                  } ${sizeConfig.container / 2 - 20} 0 0 1 ${
                    sizeConfig.container - 20
                  } ${sizeConfig.container / 2}`
                : `M ${sizeConfig.container / 2} 20 A ${
                    sizeConfig.container / 2 - 20
                  } ${sizeConfig.container / 2 - 20} 0 1 1 ${
                    sizeConfig.container / 2 - 1
                  } 20`
            }
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={
              type === "half"
                ? `${normalizedValue * Math.PI * (sizeConfig.container / 2 - 20)} ${
                    Math.PI * (sizeConfig.container / 2 - 20)
                  }`
                : `${normalizedValue * 2 * Math.PI * (sizeConfig.container / 2 - 20)} ${
                    2 * Math.PI * (sizeConfig.container / 2 - 20)
                  }`
            }
            style={{
              transition: animated
                ? "stroke-dasharray 0.6s ease-in-out"
                : undefined,
            }}
          />

          {/* Scale marks */}
          {showScale &&
            scaleMarks.map((mark, index) => (
              <g key={index}>
                <line
                  x1={
                    sizeConfig.container / 2 +
                    Math.cos((mark.angle * Math.PI) / 180) *
                      (sizeConfig.container / 2 - 30)
                  }
                  y1={
                    (type === "half"
                      ? sizeConfig.container / 2
                      : sizeConfig.container / 2) +
                    Math.sin((mark.angle * Math.PI) / 180) *
                      (sizeConfig.container / 2 - 30)
                  }
                  x2={
                    sizeConfig.container / 2 +
                    Math.cos((mark.angle * Math.PI) / 180) *
                      (sizeConfig.container / 2 - 15)
                  }
                  y2={
                    (type === "half"
                      ? sizeConfig.container / 2
                      : sizeConfig.container / 2) +
                    Math.sin((mark.angle * Math.PI) / 180) *
                      (sizeConfig.container / 2 - 15)
                  }
                  stroke="#9CA3AF"
                  strokeWidth="2"
                />
                {showLabels && index % 2 === 0 && (
                  <text
                    x={
                      sizeConfig.container / 2 +
                      Math.cos((mark.angle * Math.PI) / 180) *
                        (sizeConfig.container / 2 - 8)
                    }
                    y={
                      (type === "half"
                        ? sizeConfig.container / 2
                        : sizeConfig.container / 2) +
                      Math.sin((mark.angle * Math.PI) / 180) *
                        (sizeConfig.container / 2 - 8)
                    }
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs fill-gray-600"
                  >
                    {Math.round(mark.value)}
                  </text>
                )}
              </g>
            ))}
        </svg>

        {/* Needle */}
        <div
          className="absolute inset-0 z-20"
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: "center bottom",
          }}
        >
          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
            style={{
              width: sizeConfig.needle,
              height: sizeConfig.needle * 3.2,
            }}
          >
            <svg
              width={sizeConfig.needle}
              height={sizeConfig.needle * 3.2}
              viewBox="0 0 34 109"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* Main needle shaft */}
              <path
                d="M11.0057 91.4575L17.3575 0.740436C17.4121 -0.218292 18.7225 -0.282207 18.7589 0.761741L22.9995 91.6492C23.0905 101.556 10.6963 101.407 11.0057 91.4575Z"
                fill={color}
              />
              {/* Needle base - outer circle */}
              <path
                d="M0.322874 92.0609C0.0976403 82.9201 7.3239 75.3185 16.4646 75.0932C19.7681 75.0182 22.865 75.9003 25.4928 77.4957C30.1476 80.3299 33.3009 85.3977 33.4323 91.235C33.6763 100.376 26.45 107.977 17.2905 108.221C8.16852 108.447 0.566878 101.22 0.322874 92.0609Z"
                fill={color}
              />
              {/* Needle base - white center ring */}
              <path
                d="M8.54393 91.8544C8.43131 87.2559 12.0726 83.4269 16.6711 83.3143C18.3416 83.2768 19.8807 83.7272 21.2133 84.5156C23.5595 85.942 25.1362 88.4947 25.2112 91.4227C25.3239 96.0213 21.7013 99.8502 17.084 99.9629C12.4855 100.113 8.67531 96.4717 8.54393 91.8544Z"
                fill="white"
              />
              {/* Needle base - inner circle */}
              <path
                d="M12.5851 91.9227C12.5253 89.4768 14.46 87.4402 16.9034 87.3803C17.791 87.3603 18.6088 87.5999 19.3169 88.0192C20.5635 88.778 21.4012 90.1357 21.4411 91.6931C21.5009 94.139 19.5762 96.1756 17.1228 96.2355C14.6794 96.3153 12.6549 94.3786 12.5851 91.9227Z"
                fill={color}
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Value Display */}
      <div className="text-center mt-2">
        <div className="text-lg font-bold" style={{ color }}>
          {clampedValue.toFixed(1)}
          {unit}
        </div>
        {showLabels && (
          <div className="text-xs text-gray-500">
            {min} - {max} {unit}
          </div>
        )}
      </div>
    </div>
  );
};
