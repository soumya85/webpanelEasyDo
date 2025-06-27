# Multilingual Font System - Usage Guide

This system automatically handles font rendering for all supported languages (Hindi, Telugu, Gujarati, Bengali, Tamil, Kannada, Malayalam, Odia, Punjabi, Urdu, and English).

## 🚀 Quick Start

### Method 1: Use MultilingualText Component (Recommended)

```tsx
import { MultilingualText } from "@/components/MultilingualText";

// Simple text
<MultilingualText>Your text here</MultilingualText>

// As different HTML elements
<MultilingualText as="h1" className="text-2xl font-bold">
  Page Title
</MultilingualText>

<MultilingualText as="p" className="text-gray-600">
  Description text
</MultilingualText>

<MultilingualText as="button" onClick={handleClick} className="btn-primary">
  Button Text
</MultilingualText>
```

### Method 2: Use the Hook

```tsx
import { useMultilingualFont } from "@/components/MultilingualText";

const MyComponent = () => {
  const fontClass = useMultilingualFont();

  return <div className={fontClass}>Your content here</div>;
};
```

### Method 3: Use Higher-Order Component

```tsx
import { withMultilingualFont } from "@/components/MultilingualText";

const MyComponent = ({ title }) => (
  <div>
    <h1>{title}</h1>
  </div>
);

export default withMultilingualFont(MyComponent);
```

## 🎯 How It Works

1. **LanguageSelector Component**: When user changes language, it automatically:

   - Updates the global language context
   - Applies the correct font class to the body element
   - All MultilingualText components automatically re-render with the right font

2. **MultilingualText Component**: Automatically applies:

   - Language-specific font (e.g., Noto Sans Devanagari for Hindi)
   - Optimized text rendering
   - Proper fallback fonts

3. **Global Font Stack**:
   - Primary: Language-specific Noto Sans font
   - Fallback: Generic Noto Sans → Inter → System fonts

## 📝 Language Support

| Language  | Script     | Font Family          |
| --------- | ---------- | -------------------- |
| English   | Latin      | Inter                |
| Hindi     | Devanagari | Noto Sans Devanagari |
| Bengali   | Bengali    | Noto Sans Bengali    |
| Telugu    | Telugu     | Noto Sans Telugu     |
| Marathi   | Devanagari | Noto Sans Devanagari |
| Tamil     | Tamil      | Noto Sans Tamil      |
| Urdu      | Arabic     | Noto Sans Arabic     |
| Gujarati  | Gujarati   | Noto Sans Gujarati   |
| Kannada   | Kannada    | Noto Sans Kannada    |
| Odia      | Oriya      | Noto Sans Oriya      |
| Punjabi   | Gurmukhi   | Noto Sans Gurmukhi   |
| Malayalam | Malayalam  | Noto Sans Malayalam  |

## ✅ Best Practices

1. **Use MultilingualText for all user-facing text**:

   ```tsx
   // ✅ Good
   <MultilingualText as="h1">{t("pageTitle")}</MultilingualText>

   // ❌ Avoid
   <h1>{t("pageTitle")}</h1>
   ```

2. **Add LanguageSelector to your pages**:

   ```tsx
   <LanguageSelector position="absolute" showGlobe={true} size="md" />
   ```

3. **The system handles everything automatically** - no need to manually apply font classes anymore!

## 🔧 Customization

If you need custom styling while maintaining multilingual support:

```tsx
<MultilingualText
  as="h1"
  className="text-3xl font-bold text-blue-600 custom-spacing"
>
  {t("customTitle")}
</MultilingualText>
```

The component will merge your custom classes with the appropriate font classes automatically.
