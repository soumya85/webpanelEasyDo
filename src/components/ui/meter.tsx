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

        {/* Needle - positioned at center of meter */}
        <motion.div
          className="absolute z-10 pointer-events-none"
          style={{
            left: "50%",
            top: type === "half" ? "100%" : "50%",
            transform: "translate(-50%, -100%)",
            transformOrigin: type === "half" ? "50% 100%" : "50% 50%",
          }}
          initial={
            animated
              ? { rotate: type === "half" ? -90 : 0 }
              : { rotate: rotation }
          }
          animate={{ rotate: rotation }}
          transition={
            animated
              ? {
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  duration: 0.6,
                }
              : undefined
          }
        >
          <MeterNeedle
            size={Math.max(sizeConfig.needle * 0.8, 24)}
            rotation={0}
            color={color}
            animated={false}
          />
        </motion.div>
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
