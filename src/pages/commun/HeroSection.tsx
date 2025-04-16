import { Button } from "@/components/ui/button"; 
import { ArrowBigRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center ">
      <div className="max-w-2xl px-4 text-center text-white">
        <h1 className="mb-6 text-5xl font-bold text-black">
          Welcome to Your Marketplace
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          Explore a wide range of products from trusted vendors. Whether you're
          looking for the latest fashion, electronics, or home essentials, we've
          got something for everyone.
        </p>
       <Link to={'/register-as-vendor'}>
        <Button className="text-white transition-colors duration-300 bg-black hover:bg-gray-100 hover:text-black">
          Start as a saller <ArrowBigRight/>
        </Button>
       </Link>
      </div>
    </div>
  );
};

export default HeroSection;