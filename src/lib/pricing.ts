// Tarification VTC Audomarois
export const PRICE_PER_KM = 1.80; // €/km
export const MIN_PRICE = 15; // € minimum de course
export const BOOKING_DEPOSIT_PERCENT = 30; // % d'acompte à la réservation

// Forfaits discothèques et trajets populaires (aller simple)
export const FORFAITS = [
  // Discothèques
  { id: "so-macumba", from: "Saint-Omer", to: "Le Macumba (Englos)", km: 65, price: 90, category: "disco" },
  { id: "so-palace", from: "Saint-Omer", to: "Le Palace (Longuenesse)", km: 5, price: 15, category: "disco" },
  { id: "so-seven", from: "Saint-Omer", to: "Le Seven (Calais)", km: 45, price: 65, category: "disco" },
  { id: "so-loft", from: "Saint-Omer", to: "Le Loft (Boulogne)", km: 55, price: 75, category: "disco" },
  { id: "so-duplex", from: "Saint-Omer", to: "Le Duplex (Dunkerque)", km: 50, price: 70, category: "disco" },

  // Gares & Aéroports
  { id: "so-gare-calais", from: "Saint-Omer", to: "Gare Calais-Fréthun", km: 40, price: 55, category: "gare" },
  { id: "so-gare-lille", from: "Saint-Omer", to: "Gare Lille-Flandres", km: 75, price: 100, category: "gare" },
  { id: "so-aeroport-lesquin", from: "Saint-Omer", to: "Aéroport Lille-Lesquin", km: 85, price: 115, category: "gare" },

  // Villes
  { id: "so-calais", from: "Saint-Omer", to: "Calais", km: 42, price: 60, category: "ville" },
  { id: "so-boulogne", from: "Saint-Omer", to: "Boulogne-sur-Mer", km: 53, price: 72, category: "ville" },
  { id: "so-dunkerque", from: "Saint-Omer", to: "Dunkerque", km: 48, price: 68, category: "ville" },
  { id: "so-lille", from: "Saint-Omer", to: "Lille", km: 75, price: 100, category: "ville" },
  { id: "so-hazebrouck", from: "Saint-Omer", to: "Hazebrouck", km: 25, price: 38, category: "ville" },
  { id: "so-bethune", from: "Saint-Omer", to: "Béthune", km: 35, price: 50, category: "ville" },
] as const;

export type Forfait = typeof FORFAITS[number];

export function calculatePrice(distanceKm: number): number {
  const price = distanceKm * PRICE_PER_KM;
  return Math.max(price, MIN_PRICE);
}

export function calculateDeposit(totalPrice: number): number {
  return Math.ceil(totalPrice * BOOKING_DEPOSIT_PERCENT / 100);
}

export function getCategoryLabel(category: string): string {
  switch (category) {
    case "disco": return "Discothèques";
    case "gare": return "Gares & Aéroports";
    case "ville": return "Villes";
    default: return category;
  }
}
