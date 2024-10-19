import ThemeSwitcher from "@/components/themeSwitcher";
import {
  IconBell,
  IconBriefcase,
  IconMenu2,
  IconSearch,
} from "@tabler/icons-react";
import React from "react";

interface HeaderProps {
  setIsMobileSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ setIsMobileSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between pl-4 pr-4 transition-all duration-300 bg-white border-b shadow-md dark:bg-gray-800 dark:border-gray-700">
      {/* Left: Search Bar */}
      <div className="items-center hidden lg:flex">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="py-2 pl-10 pr-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:border-gray-700 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
          />
          <IconSearch className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-300" />
        </div>
      </div>

      <div className="lg:hidden" onClick={() => setIsMobileSidebarOpen(true)}>
        <IconMenu2 className="text-gray-600 dark:text-gray-300" />
      </div>

      {/* Right: Profile Section */}
      <div className="flex items-center text-gray-700 gap-x-2 dark:text-gray-300">
        <div className="relative cursor-pointer">
          <div className="p-2 transition-all duration-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-lg">
            <IconBriefcase className="w-6 h-6" />
          </div>
          <span className="absolute px-1 text-xs text-white bg-blue-500 rounded-full -top-0 -right-0">
            5
          </span>
        </div>

        <div className="relative cursor-pointer">
          <div className="p-2 transition-all duration-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-lg">
            <IconBell className="w-6 h-6" />
          </div>
          <span className="absolute px-1 text-xs text-white bg-red-500 rounded-full -top-0 -right-0">
            3
          </span>
        </div>

        <ThemeSwitcher />

        <div className="flex items-center py-3 pr-3 bg-white rounded-lg gap-x-3 dark:bg-gray-800 bg-opacity-20 backdrop-blur-lg">
          <img
            src="https://themesbrand.com/velzon/html/modern/assets/images/users/avatar-1.jpg"
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div className="text-start">
            <p className="text-base font-semibold text-gray-900 dark:text-white">
              Anna Adame
            </p>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Founder
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
