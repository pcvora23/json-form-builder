import { IconMoon, IconSun } from "@tabler/icons-react";
import { useEffect } from "react";
import { useThemeStore } from "../store/useThemeStore";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div
      className="flex items-center p-2 hover:bg-gray-300 hover:dark:bg-gray-300/30 rounded-full cursor-pointer transition-colors duration-300"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <IconMoon className="w-6 h-6" />
      ) : (
        <IconSun className="w-6 h-6" />
      )}
    </div>
  );
};

export default ThemeSwitcher;
