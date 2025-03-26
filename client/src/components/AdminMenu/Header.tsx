import API from "@/api";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { Loader2, LogOut, Menu } from "lucide-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Header: React.FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const logout = async () => {
    try {
      setLoggingOut(true);
      const resp = await API.get("/admin/logout", {
        withCredentials: true,
      });
      setLoggingOut(false);
      if (resp.status === 200) {
        toast.success("Logged out successfully");
        authContext?.setIsAuthenticated(false);
        navigate("/login");
      }
    } catch (error) {
      setLoggingOut(false);
      toast.error("An error occurred while logging out");
    }
  };

  return (
    <header className="flex items-center justify-between border-b-[1px] border-gray-200 bg-[#F8F8FF] p-4 text-slate-500">
      <div className="flex items-center gap-4">
        <Button variant="ghost" className="md:hidden" onClick={toggleSidebar}>
          <Menu size={24} />
        </Button>
        <h1 className="text-xl font-semibold tracking-[0.3px]">Admin Panel</h1>
      </div>
      <Button
        disabled={loggingOut}
        onClick={logout}
        variant="default"
        className="rounded-sm font-medium tracking-[0.5px]"
      >
        {!loggingOut ? (
          <LogOut size={20} strokeWidth={2} />
        ) : (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
        Logout
      </Button>
    </header>
  );
};

export default Header;
