import { useEffect, useState } from "react";
import { actGetCategories, categoriesRecordsCleanUp } from "@/components/store/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "@/components/store/hooks";
import { Category } from "@/components/ecomerce";


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
    <div className="bg-gray-100 dark:bg-gray-900 py-6">
      {/* Conteneur principal du menu */}
      <div className="container mx-auto flex flex-wrap items-center gap-4 md:gap-8">
        {/* Menu Déroulant (Dropdown) */}
        <details className="dropdown dropdown-end">
          <summary className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
            Toutes les Catégories
          </summary>
          <ul className="z-10 w-56 p-2 mt-2 overflow-y-auto bg-white dark:bg-gray-800 menu dropdown-content rounded-lg shadow-lg max-h-96 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
            {records.length > 0 ? (
              records.map((record) => (
                <li
                  key={record.id}
                  className={`flex items-center py-2 px-4 rounded-md cursor-pointer transition-all duration-300 ${
                    activeCategory === record.id
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                  }`}
                  onClick={() => setActiveCategory(record.id)}
                >
                  {record.title}
                </li>
              ))
            ) : (
              <li className="py-4 text-center text-gray-500 dark:text-gray-400">
                Aucune catégorie disponible.
              </li>
            )}
          </ul>
        </details>

        {/* Affichage des Catégories en Ligne */}
        <div className="flex flex-wrap gap-2">
          {records.length > 0 ? (
            records.map((record) => (
              <div
                key={record.id}
                className={`relative flex items-center justify-center py-2 px-4 rounded-lg transition-all duration-300 cursor-pointer ${
                  activeCategory === record.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm"
                }`}
                onClick={() => setActiveCategory(record.id)}
              >
                <Category {...record} />
              </div>
            ))
          ) : (
            <p className="py-4 text-center text-gray-500 dark:text-gray-400">
              Aucune catégorie disponible.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;