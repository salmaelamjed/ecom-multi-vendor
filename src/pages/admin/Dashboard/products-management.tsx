import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/components/store/hooks";
import { actGetAllProducts } from "@/components/store/products/productsSlice";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Fonction pour colorier le badge selon le statut produit
const getProductStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "available":
    case "approved":
      return "bg-green-200 text-green-800";
    case "out_of_stock":
      return "bg-yellow-200 text-yellow-800";
    case "pending":
      return "bg-blue-200 text-blue-800";
    case "discontinued":
      return "bg-gray-200 text-gray-800";
    case "rejected":
    case "deleted":
    case "removed":
      return "bg-red-200 text-red-800";
    default:
      return "bg-zinc-200 text-zinc-800";
  }
};

const ProductsManagement = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const { records } = useAppSelector((state) => state.products);

  useEffect(() => {
    const controller = new AbortController();
    dispatch(actGetAllProducts({ signal: controller.signal }));
    return () => controller.abort();
  }, [dispatch]);

  // Appliquer le filtrage sur les produits avant de les afficher
  const filteredRecords = records.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/*search input */}
      <div className="flex justify-end mb-4">
        <div className="relative w-full max-w-xs">
          <Input
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-10"
          />
          <Button
            type="button"
            variant="default"
            className="absolute top-0 right-0 h-full text-white bg-blue-600 rounded-l-none hover:bg-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </Button>
        </div>
      </div>

      <div className="overflow-auto border rounded-md shadow-sm">
        <ScrollArea className="max-h-[500px]">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-white">
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Marque</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="rounded"
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.brand || "—"}</TableCell>
                  <TableCell>{product.cat_prefix}</TableCell>
                  <TableCell>{product.price} DH</TableCell>
                  <TableCell>{product.quantity || 0}</TableCell>
                  <TableCell>
                    <Badge
                      className={`w-24 justify-center ${getProductStatusColor(
                        product.status || "deleted"
                      )}`}
                    >
                      {product.status || "deleted"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white border shadow-lg">
                        <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
                          <Eye className="w-4 h-4 mr-2" /> Voir les détails
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-yellow-50">
                          <Edit className="w-4 h-4 mr-2" /> Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-red-50">
                          <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ProductsManagement;
