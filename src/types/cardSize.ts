export type CardSize = "small" | "medium" | "large" | "extra-large";

export interface CardSizeConfig {
  gridSpan: string;
  minHeight: string;
  displayName: string;
}

export const CARD_SIZE_CONFIG: Record<CardSize, CardSizeConfig> = {
  small: {
    gridSpan: "col-span-1",
    minHeight: "min-h-[320px]", // Same height for all
    displayName: "Small",
  },
  medium: {
    gridSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    minHeight: "min-h-[320px]", // Same height for all
    displayName: "Medium",
  },
  large: {
    gridSpan: "col-span-1 md:col-span-2 lg:col-span-2",
    minHeight: "min-h-[320px]", // Same height for all
    displayName: "Large",
  },
  "extra-large": {
    gridSpan: "col-span-1 md:col-span-2 lg:col-span-4",
    minHeight: "min-h-[320px]", // Same height for all
    displayName: "Extra Large",
  },
};
