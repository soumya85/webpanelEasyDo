import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MeterNeedleProps {
  /** The SVG size */
  size?: number;
  /** Rotation angle in degrees (0-180 for half circle, 0-360 for full circle) */
  rotation?: number;
  /** Custom className for styling */
  className?: string;
  /** Color of the needle - defaults to design system color */
  color?: string;
  /** Whether to animate the needle rotation */
  animated?: boolean;
}

export const MeterNeedle: React.FC<MeterNeedleProps> = ({
  size = 34,
  rotation = 0,
  className,
  color = "#1E3A5F",
  animated = true,
}) => {
  const viewBoxSize = Math.max(size, 34); // Ensure minimum size for visibility
  const scale = size / 34; // Scale factor based on original SVG size

  return (
    <motion.div
      className={cn("flex-shrink-0", className)}
      style={{
        width: size,
        height: size * 3.2, // Maintain aspect ratio (109/34)
      }}
      initial={animated ? { rotate: 0 } : { rotate: rotation }}
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
      <svg
        width={size}
        height={size * 3.2}
        viewBox={`0 0 34 109`}
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
    </motion.div>
  );
};
