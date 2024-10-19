import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { IconPin, IconPinFilled } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import formData from "../../data.json";

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebarPinned: boolean;
  setIsSidebarPinned: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface MenuItem {
  title: string;
  to?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarPinned,
  open,
  setIsSidebarPinned,
  setOpen,
  isMobileSidebarOpen,
  setIsMobileSidebarOpen,
}) => {
  const location = useLocation();

  const Menus: MenuItem[] = formData.form.groups.map((group) => ({
    title: group.title,
    to: `/form/${group.title.replace(/\s+/g, "-").toLowerCase()}`,
  }));

  const isActive = (to: string | undefined) => location.pathname === to;

  return (
    <div
      className={`hidden lg:block shadow-md ${
        open ? "lg:w-72" : "lg:w-20"
      } bg-white dark:bg-gray-800 h-screen fixed top-0 left-0 z-[99] duration-300 overflow-hidden border-r dark:border-gray-700`}
      onMouseOver={() => !isSidebarPinned && setOpen(true)}
      onMouseLeave={() => !isSidebarPinned && setOpen(false)}
    >
      <div className="flex items-center justify-between p-3 max-h-[59px]">
        <Link className="flex items-center gap-x-4" to="/">
          <img
            src="/logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[180deg]"
            }`}
          />
          <h1
            className={`text-gray-500 dark:text-gray-200 origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Dynamic Form
          </h1>
        </Link>
        <div
          className="cursor-pointer"
          onClick={() => setIsSidebarPinned(!isSidebarPinned)}
        >
          {isSidebarPinned ? (
            <IconPinFilled className="w-8 h-8 text-gray-600 dark:text-gray-300" />
          ) : (
            <IconPin className="w-8 h-8 text-gray-600 dark:text-gray-300" />
          )}
        </div>
      </div>

      <div className="p-4 pt-3">
        {Menus.map((Menu, index) => (
          <div key={index}>
            <Link
              className={`flex justify-between items-center cursor-pointer p-2 my-1 rounded-md ${
                isActive(Menu.to)
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-300 text-gray-600 dark:text-gray-400"
              }`}
              to={Menu.to as string}
            >
              <div className="flex items-center w-full truncate gap-x-4">
                {Menu.title}
              </div>
            </Link>
          </div>
        ))}
      </div>
      {isMobileSidebarOpen && (
        <Sheet
          open={isMobileSidebarOpen}
          onOpenChange={() => setIsMobileSidebarOpen(false)}
        >
          <SheetContent side="left">
            <SheetHeader>
              <Link
                onClick={() => setIsMobileSidebarOpen(false)}
                className="flex items-center gap-x-4"
                to="/"
              >
                <img src="/logo.png" />
                <h1
                  className={`text-gray-500 dark:text-gray-200 origin-left font-medium text-xl duration-200 ${
                    !open && "scale-0"
                  }`}
                >
                  Dynamic Form
                </h1>
              </Link>
            </SheetHeader>
            <div className="grid py-4">
              {Menus.map((Menu, index) => (
                <Link
                  key={index}
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className={`flex justify-between items-center cursor-pointer p-2 my-1 rounded-md ${
                    isActive(Menu.to)
                      ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-300 text-gray-600 dark:text-gray-400"
                  }`}
                  to={Menu.to as string}
                >
                  <div className="flex items-center w-full truncate gap-x-4">
                    {Menu.title}
                  </div>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default Sidebar;
