import { useContext, useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "@/api";

interface IAdminLoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const [adminLogging, setAdminLogging] = useState<boolean>(false);

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Login must be used within an AuthProvider");
  }

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAdminLoginForm>({});

  const handleLogin = async (data: IAdminLoginForm) => {
    try {
      setAdminLogging(true);
      const resp = await API.post("/admin/login", data, {
        withCredentials: true,
      });
      setAdminLogging(false);

      if (resp.status === 200) {
        toast.success("Logged in successfully");
        authContext.setIsAuthenticated(true);
        navigate("/");
      }
    } catch (error) {
      setAdminLogging(false);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong!");
      } else {
        toast.error("An unexpected error occurred");
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (authContext.isAuthenticated) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#F8F8FF]">
      <div
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        }}
        className="mx-6 w-[475px] rounded-md bg-white p-8"
      >
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col gap-4"
        >
          <div className="mb-3 flex flex-col items-center gap-3">
            <Lock size={40} />
            <h3 className="text-md font-semibold tracking-[0.5px]">
              Welcome to Admin Panel
            </h3>
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              className="text-sm font-medium"
              type="email"
              id="email"
              placeholder="Email"
              {...register("email", {
                required: "Email name is required",
              })}
            />
            {errors.email && (
              <p className="mt-1 text-xs font-semibold text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              className="text-sm font-medium"
              type="password"
              id="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="mt-1 text-xs font-semibold text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button
            disabled={adminLogging}
            variant="default"
            className="mt-2 w-full"
          >
            {adminLogging && <Loader2 className="h-4 w-4 animate-spin" />}
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
