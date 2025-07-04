import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const getInitialTheme = () => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button className="btn btn-sm btn-outline ml-2" onClick={toggleTheme}>
      {theme === "light" ? "🌞 Light" : "🌚 Dark"}
    </button>
  );
};

export default ThemeToggle;
