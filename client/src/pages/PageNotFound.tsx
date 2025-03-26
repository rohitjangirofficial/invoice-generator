import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      <h3 className="text-2xl font-bold">Page Not Found</h3>
      <Button onClick={() => navigate("/")}>Go To Home</Button>
    </div>
  );
};

export default PageNotFound;
