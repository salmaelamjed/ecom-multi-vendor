export interface IOrderItem {
  product_id: number; // ID du produit
  quantity: number; // Quantité du produit
  price: number; // Prix unitaire du produit
  total: number; // Total pour cet article (prix * quantité)
}

export interface IShippingAddress {
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
}

export interface IPayment {
  method: "credit_card" | "paypal" | "bank_transfer"; // Méthode de paiement
  status: "completed" | "pending" | "failed"; // Statut du paiement
  transaction_id: string; // ID de la transaction
}

export interface IOrder {
  id: number; // ID unique de la commande
  user_id: number; 
  status: "pending" | "shipped" | "delivered" | "cancelled"; // Statut de la commande
  total_amount: number; // Montant total de la commande
  shipping_address: IShippingAddress; // Adresse de livraison
  order_date: string; // Date de la commande
  items: IOrderItem[]; // Liste des articles de la commande
  payment: IPayment; // Informations sur le paiement
  shipping_method: "standard" | "express"; // Méthode d'expédition
  tracking_number?: string; // Numéro de suivi (facultatif)
}
