import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const AdminMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen flex-col">
      <Header toggleSidebar={toggleSidebar} />
      <div className="relative flex flex-1">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black opacity-50 md:hidden"
            onClick={toggleSidebar}
          />
        )}
        <main className="flex-1 overflow-y-auto bg-white p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminMenu;
