import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        background: 'hsl(var(--background) / <alpha-value>)',
        card: 'hsl(var(--card) / <alpha-value>)',
        popover: 'hsl(var(--popover) / <alpha-value>)',
        primary: 'hsl(var(--primary) / <alpha-value>)',
        secondary: 'hsl(var(--secondary) / <alpha-value>)',
        muted: 'hsl(var(--muted) / <alpha-value>)',
        accent: 'hsl(var(--accent) / <alpha-value>)',
        destructive: 'hsl(var(--destructive) / <alpha-value>)',
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
      },
      textColor: {
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        cardForeground: 'hsl(var(--card-foreground) / <alpha-value>)',
        popoverForeground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        primaryForeground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        secondaryForeground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        mutedForeground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        accentForeground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        destructiveForeground:
          'hsl(var(--destructive-foreground) / <alpha-value>)',
        warning: 'hsl(var(--warning) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
export default config;
