/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      height: {
        custom: "calc(100vh - 77px)",
      },
      colors: {
        danger: "#DD3939",
        custom: {
          red: "#DD3939",
        },
        separator: "#E5E7EB",
        label: "#4B5563",
        card: {
          title: "#212B36",
        },
        heading: {
          subtext: "#6B7280",
        },
        dark: {
          light: {
            1: "#e1e1e1",
            2: "#b2b2b2",
            3: "#bbbbbb",
          },
          shape: {
            1: "#1B1B1B",
            2: "#222222",
            3: "#181818",
          },
          selected: "#2A2A2A",
          stroke: "#303030",
          text: "#e1e1e1",
          subtext: "#bbbbbb",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};