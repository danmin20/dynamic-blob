import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import "./index.scss";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  return (
    <div
      onClick={() => setIsDarkMode((isDark) => !isDark)}
      className="theme-toggle"
    >
      {isDarkMode ? (
        <SunIcon className="theme-icon" />
      ) : (
        <MoonIcon className="theme-icon" />
      )}
    </div>
  );
};

export default ThemeToggle;
