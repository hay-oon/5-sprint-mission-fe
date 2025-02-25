import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.css",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "primary-blue": "var(--primary-blue)",
        "text-primary-black": "var(--text-primary-black)",
        "text-secondary-black": "var(--text-secondary-black)",
        "text-primary-charcoal": "var(--text-primary-charcoal)",
        "text-primary-gray": "var(--text-primary-gray)",
        "text-secondary-gray": "var(--text-secondary-gray)",
        "text-primary-white": "var(--text-primary-white)",
        "text-secondary-white": "var(--text-secondary-white)",
        "text-primary-blue": "var(--text-primary-blue)",
        "text-error-red": "var(--text-error-red)",
        "banner-background": "var(--banner-background)",
        "best-article-background": "var(--best-article-background)",
      },
    },
  },
  plugins: [],
} satisfies Config;
