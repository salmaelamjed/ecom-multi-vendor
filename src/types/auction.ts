export type AuctionStatus =
  | "pending" // L'enchère est créée mais en attente de validation admin
  | "approved" // Validée par admin, mais pas encore commencée (≠ "active")
  | "rejected" // Refusée par admin (non conforme)
  | "canceled" // Supprimée/annulée (admin ou vendeur)
  | "active" // Actuellement en cours
  | "ended" // Terminé naturellement (fin du temps)
  | "sold" // Produit livré au gagnant (optionnel)
  | "expired"; // L'enchère est finie mais sans aucune offre

  export interface TAuction {
    id: number;
    product_name: string;
    description: string;
    categorie: string;
    image: string;
    starting_price: number;
    current_price: number;
    start_date: string; 
    end_date: string; // ISO string format
    status: AuctionStatus;
    created_by: {
      user_id: number;
      username: string;
    };
    last_bid?: {
      user_id: number;
      username: string;
      amount: number;
      bid_time: string; // ISO 
    };
  }
