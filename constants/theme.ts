// constants/theme.ts
export const theme = {
  colors: {
    background: "#F5F7FA",
    white: "#FFFFFF",
    text: "#111827",
    textSecondary: "#6B7280",
    primary: "#2E7CF6",
    error: "#EF4444"
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24
  },
  fontSize: {
    sm: 13,
    md: 15,
    lg: 17,
    xl: 20,
    xxl: 24,
    xxxl: 28
  },
  fontWeight: {
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const
  },
  borderRadius: {
    sm: 8,
    md: 10,
    lg: 14
  }
};
export type Theme = typeof theme;