import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button"; 
import { Search } from "lucide-react";

export default function SearchForm() {
  return (
    <div className="w-full max-w-[480px]"> 
      <form action="/search">
        <div className="relative">
          {/* Champ de recherche */}
          <Input
            type="text"
            name="q"
            className="w-full border h-12 p-4 rounded-full dark:text-gray-800 dark:border-gray-700 dark:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 no-shadow" 
            placeholder="Search"
          />
          {/* Bouton de soumission avec icône */}
          <Button
            type="submit"
            className="absolute top-1/2 right-3 transform -translate-y-1/2 p-2 rounded-full bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Search className="h-5 w-5 text-blue-500 dark:text-blue-500" />
          </Button>
        </div>
      </form>
    </div>
  );
}