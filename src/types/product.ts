export type TProduct = {
  id: number; // L'identifiant unique du produit
  name: string; // Le nom du produit
  description: string; // La description du produit
  price: number; // Le prix du produit
  quantity: number; // La quantite en stock du produit
  cat_prefix?: string; // Le préfixe de la categorie
  store_id: number; // L'identifiant du magasin qui vend ce produit
  image: string; // L'URL de l'image principale du produit
  images?: string[];
  brand?: string;
  vendor_id: number; // L'identifiant du vendeur qui propose ce produit
  status:
    | "available"
    | "out_of_stock"
    | "discontinued"
    | "pending"
    | "approved"
    | "rejected";
  ratings?: {
    user_id: number;
    rating: number; //  x/5
    review: string; // Le texte de la critique
    created_at: string; // La date de création de l'évaluation
  }[]; // Tableau d'évaluations
  isLiked?: boolean;
  isAuthenticated?: boolean; // Indicateur si l'utilisateur est authentifié
  colors?: string[];
};
