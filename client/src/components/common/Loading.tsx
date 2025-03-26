import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-1.5">
      <Loader2 className="h-6 w-6 animate-spin" />
      <p className="text-sm font-medium">Loading...</p>
    </div>
  );
};

export default Loading;
