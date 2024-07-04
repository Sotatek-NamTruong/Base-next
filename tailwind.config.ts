import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "din-pro": ["var(--font-din-pro)"],
        "zen-dots": ["var(--font-zen-dots)"],
      },
      colors: {
        stroke: "var(--color-stroke)",
        support: "var(--color-support)",
        main: {
          2: "var(--color-main-2)",
          6: "var(--color-main-6)",
        },
        primary: {
          dark: "var(--color-primary-dark)",
          brand: "var(--color-primary-brand)",
          light: "var(--color-primary-light)",
          lighter: "var(--color-primary-lighter)",
          lightest: "var(--color-primary-lightest)",
          line: "var(--color-primary-line)",
        },
        state: {
          info: {
            DEFAULT: "var(--color-state-info)",
            700: "var(--color-state-info-700)",
          },
          success: {
            DEFAULT: "var(--color-state-success)",
            150: "var(--color-state-success-150)",
          },
          warning: {
            DEFAULT: "var(--color-state-warning)",
            150: "var(--color-state-warning-150)",
            notify: "var(--color-warning-notify)",
          },
          error: {
            DEFAULT: "var(--color-state-error)",
            150: "var(--color-state-error-150)",
          },
        },
        neutral: {
          1: "var(--color-neutral-1)",
          2: "var(--color-neutral-2)",
          3: "var(--color-neutral-3)",
          4: "var(--color-neutral-4)",
          5: "var(--color-neutral-5)",
          6: "var(--color-neutral-6)",
          7: "var(--color-neutral-7)",
          white: "var(--color-neutral-white)",
          "white-6": "var(--color-neutral-white-6)",
          popup: "var(--color-neutral-popup)",
          background: "var(--color-neutral-background)",
          scrollbar: "var(--bg-scroll-bar)",
        },
        green: {
          light: "var(--color-green-light)",
          lightest: "var(--color-green-lightest)",
          dart: "var(--color-green-dart)",
        },
        footer: {
          primary: "var(--color-text-footer)",
          hover: "var(--bg-footer-hover)",
        },
      },
      boxShadow: {
        active: "var(--shadow-active)",
        notification: "var(--shadow-notification)",
      },
      width: {
        container: "1440px",
      },
      maxWidth: {
        container: "1440px",
      },
      backgroundImage: {
        "main-1": "var(--color-main-1)",
        "main-1-blur": "var(--color-main-1-blur)",
        "main-2": "var(--color-main-2)",
        "main-3": "var(--color-main-3)",
        "main-4": "var(--color-main-4)",
        "main-5": "var(--color-main-5)",
        "input-error": "var(--color-bg-error)",
        "overlay-1":
          "linear-gradient(0deg, rgba(16, 38, 26, 0.00) 0%, rgba(0, 0, 0, 0.72) 100%)",
      },
    },
    screens: {
      "2xs": "0px",
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
  },

  plugins: [],
};
export default config;
