import { TLoading } from "@/types/shared";
import loading from '@/assets/lottieFiles/loading.json';
import Lottie from "lottie-react";

type LoadingProps = {
  status: TLoading;
  error: null | string;
  children: React.ReactNode;
};

const Loading = ({ status, error, children }: LoadingProps) => {
  if (status === "pending") {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Lottie animationData={loading} className="w-64 h-64" />
        <h3 className="mt-4 text-lg font-semibold">Please wait ...</h3>
      </div>
    );
  }
  if (status === "failed") {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Lottie animationData={loading} className="w-64 h-64" />
        <h3 className="mt-4 text-lg font-semibold text-red-600">{error}</h3>
      </div>
    );
  }
  return <div>{children}</div>;
};

export default Loading;