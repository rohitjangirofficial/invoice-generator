import { Button } from "@/components/ui/button";
import { Book, House, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar: React.FC<{ isOpen: boolean; toggleSidebar: () => void }> = ({
  isOpen,
  toggleSidebar,
}) => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Home",
      path: "/",
      icon: <House className="scale-125" />,
    },
    {
      name: "Add Customers",
      path: "/add-customers",
      icon: <User className="scale-125" />,
    },
    {
      name: "Invoice Creation",
      path: "/invoice-creation",
      icon: <Book className="scale-125" />,
    },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 transform border-r-[1px] border-gray-200 bg-[#F8F8FF] p-4 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } z-50 transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
    >
      <h2 className="mb-4 text-sm font-medium text-slate-500">MENU</h2>
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.name}
            className="border-grey-400 mb-2 border-0 text-slate-500"
          >
            <Link
              to={item.path}
              onClick={toggleSidebar}
              className="h-full border-0 border-red-400"
            >
              <Button
                variant="ghost"
                className={`h-full w-full justify-start gap-3 border-0 border-purple-400 py-2.5 text-sm font-medium hover:hover:bg-blue-100 hover:text-blue-800 ${location.pathname === item.path && "bg-blue-100 text-blue-800"}`}
              >
                {item.icon}
                {item.name}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
