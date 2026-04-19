export const theme = {
  colors: {
    surfaceLowest: "#0E0E0F",
    surface: "#131314",
    surfaceContainer: "#1A1B1C",
    surfaceContainerHigh: "#222324",
    surfaceContainerHighest: "#2C3138",

    primary: "#ABC7FF",
    primaryContainer: "#448FFD",

    onSurface: "#E5E2E3",
    onSurfaceVariant: "#C1C6D5",
    outline: "#8B919F",
    outlineVariant: "#414753",

    camera: "#F2994A",
    sensor: "#4ADE80",
    good: "#4ADE80",
    weak: "#FACC15",
    dead: "#FF6B6B",
    errorText: "#FFB4AB",
    errorContainer: "#93000A",
  },

  fonts: {
    sans: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, monospace",
  },

  fontSize: {
    label: "10px",
    labelSmall: "9px",
    body: "12px",
    bodySmall: "11px",
    tag: "9px",
    tagSmall: "8px",
  },

  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  letterSpacing: {
    tight: "0.02em",
    normal: "0.04em",
    wide: "0.08em",
    wider: "0.10em",
    widest: "0.12em",
  },

  space: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
    xxl: "24px",
    xxxl: "32px",
  },

  radius: {
    none: "0px",
    sm: "2px",
    md: "3px",
  },

  layout: {
    sidebarWidth: "248px",
    panelWidth: "264px",
  },

  transition: {
    fast: "100ms linear",
    default: "120ms ease-out",
  },
} as const;

export type AppTheme = typeof theme;
