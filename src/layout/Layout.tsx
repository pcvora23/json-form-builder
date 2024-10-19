import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [isSidebarPinned, setIsSidebarPinned] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] =
    useState<boolean>(false);

  return (
    <div className="h-screen">
      <Sidebar
        open={open}
        setOpen={setOpen}
        isSidebarPinned={isSidebarPinned}
        setIsSidebarPinned={setIsSidebarPinned}
        isMobileSidebarOpen={isMobileSidebarOpen}
        setIsMobileSidebarOpen={setIsMobileSidebarOpen}
      />
      <div
        className={`relative flex-1 transition-all duration-300 ${
          isSidebarPinned ? "lg:ml-72" : "lg:ml-20"
        }`}
      >
        <Header setIsMobileSidebarOpen={setIsMobileSidebarOpen} />
        <div className="m-4 h-[calc(100vh-5rem)]">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
