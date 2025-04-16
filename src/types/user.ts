import { Address } from "./address";

// Interface pour afficher un utilisateur ( dashboard, profil)
export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "vendor" | "customer";
  status: "pending" | "approved" | "rejected" | "active" | "inactive";
  store_id: number | null;
  photo_url?: string;
  address: Address;
}

// Interface pour l'inscription ou la mise à jour (avec password)
export interface UserInput {
  name: string;
  email: string;
  password: string;
  role: "vendor" | "customer";
  address: Address;
}
