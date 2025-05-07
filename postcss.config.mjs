const config = {
  plugins: ["@tailwindcss/postcss"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./node_modules/sonner/**/*.{js,ts,jsx,tsx}",
  ],
};

export default config;
