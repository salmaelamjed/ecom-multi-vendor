import { Button } from "@/components/ui/button"; 
import { ArrowBigRight } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center ">
      <div className="text-center text-white max-w-2xl px-4">
        <h1 className="text-5xl font-bold mb-6 text-black">
          Welcome to Your Marketplace
        </h1>
        <p className="text-lg mb-8 text-gray-600">
          Explore a wide range of products from trusted vendors. Whether you're
          looking for the latest fashion, electronics, or home essentials, we've
          got something for everyone.
        </p>
        <Button className="bg-black  hover:bg-gray-100 hover:text-black transition-colors duration-300 text-white">
          Start as a saller <ArrowBigRight/>
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;