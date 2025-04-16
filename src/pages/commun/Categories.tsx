import { useEffect, useState } from "react";
import { actGetCategories, categoriesRecordsCleanUp } from "@/components/store/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "@/components/store/hooks";
import { Category } from "@/components/ecomerce";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { records } = useAppSelector((state) => state.categories);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  useEffect(() => {
    dispatch(actGetCategories());
    return () => {
      dispatch(categoriesRecordsCleanUp());
    };
  }, [dispatch]);

  return (
    <div className="bg-white shadow-sm dark:bg-gray-900">
      {/* Conteneur principal du menu */}
      <div className="container flex flex-wrap items-center justify-center gap-4 mx-auto md:gap-8">
        {/* Menu Déroulant (Dropdown) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="py-2 border-none shadow-none cursor-pointer">
              All Categories
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Shop by Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {records.length > 0 ? (
              records.map((record) => (
                <Link to={`/categories/products/${record.prefix}`} key={record.id}>
                  <DropdownMenuItem
                    className={`${
                      activeCategory === record.id
                        ? "bg-primary text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => setActiveCategory(record.id)}
                  >
                    {record.title}
                  </DropdownMenuItem>
                </Link>
              ))
            ) : (
              <DropdownMenuItem disabled>
                Aucune catégorie disponible
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Affichage des Catégories en Ligne */}
        <div className="flex flex-wrap gap-2">
          {records.length > 0 ? (
            records.map((record) => (
              <div
                key={record.id}
                className={`relative flex items-center justify-center py-1 px-7 rounded-sm transition-all duration-300 cursor-pointer ${
                  activeCategory === record.id
                    ? "bg-blue-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
                onClick={() => setActiveCategory(record.id)}
              >
                <Category {...record} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Aucune catégorie disponible.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;