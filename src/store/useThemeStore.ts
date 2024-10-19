import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

export const useThemeStore = create<Store>()(
  persist(
    (set) => ({
      theme: "light",
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
    }),
    {
      name: "theme-storage",
    }
  )
);
