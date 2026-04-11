import { config } from "./config";

// Re-export from config for backward compatibility
export const PRICE_PER_KM = config.pricePerKm;
export const MIN_PRICE = config.minPrice;
export const BOOKING_DEPOSIT_PERCENT = config.depositPercent;

// Forfaits discothèques et trajets populaires (aller simple)
// Ces forfaits sont spécifiques à chaque chauffeur
// Ils peuvent être définis via NEXT_PUBLIC_DRIVER_FORFAITS (JSON) ou garder les défauts
const DEFAULT_FORFAITS = [
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
];

function loadForfaits() {
  const env = process.env.NEXT_PUBLIC_DRIVER_FORFAITS;
  if (env) {
    try {
      return JSON.parse(env);
    } catch {
      return [];
    }
  }
  // Pas de forfaits définis = tableau vide (trajet libre uniquement)
  // Les DEFAULT_FORFAITS ne s'appliquent qu'à AudoVTC (domaine audovtc.fr)
  const domain = process.env.NEXT_PUBLIC_DRIVER_DOMAIN || "";
  if (domain && !domain.includes("audovtc")) return [];
  return DEFAULT_FORFAITS;
}

export const FORFAITS: { id: string; from: string; to: string; km: number; price: number; category: string }[] = loadForfaits();

export type Forfait = typeof FORFAITS[number];

export { calculatePrice, calculateDeposit } from "./config";

export function getCategoryLabel(category: string): string {
  switch (category) {
    case "disco": return "Discothèques";
    case "gare": return "Gares & Aéroports";
    case "ville": return "Villes";
    default: return category;
  }
}
