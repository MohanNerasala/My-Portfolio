/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        foreground: "var(--text)",
        muted: "var(--text-muted)",
        cardBg: "var(--card-bg)",
        border: "var(--border-color)",
        termHead: "var(--term-head)",
        termBorder: "var(--term-border)",
        termBody: "var(--term-body)",
        termText: "var(--term-text)",
        termMuted: "var(--term-text-muted)",
        gold: {
          DEFAULT: "#f5c518",
          bright: "#ffd700",
          muted: "rgba(245, 197, 24, 0.2)",
          glow: "rgba(245, 197, 24, 0.3)",
        },
        glass: {
          DEFAULT: "var(--glass)",
          strong: "var(--glass-strong)",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        bebas: ["'Bebas Neue'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
}
