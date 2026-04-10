// Configuration chauffeur — tout est personnalisable via variables d'environnement
// Fallback sur les valeurs AudoVTC si non définies

export const config = {
  // Identité
  brand: process.env.NEXT_PUBLIC_DRIVER_BRAND || "AudoVTC",
  brandShort: process.env.NEXT_PUBLIC_DRIVER_BRAND_SHORT || "AUDOVTC",
  tagline: process.env.NEXT_PUBLIC_DRIVER_TAGLINE || "Votre chauffeur privé dans l'Audomarois",
  city: process.env.NEXT_PUBLIC_DRIVER_CITY || "Saint-Omer",
  region: process.env.NEXT_PUBLIC_DRIVER_REGION || "Audomarois",
  department: process.env.NEXT_PUBLIC_DRIVER_DEPARTMENT || "Pas-de-Calais",
  postalCode: process.env.NEXT_PUBLIC_DRIVER_POSTAL_CODE || "62500",

  // Contact
  phone: process.env.NEXT_PUBLIC_DRIVER_PHONE || "07 43 28 93 93",
  phoneIntl: process.env.NEXT_PUBLIC_DRIVER_PHONE_INTL || "+33743289393",
  whatsapp: process.env.NEXT_PUBLIC_DRIVER_WHATSAPP || "33743289393",
  email: process.env.NEXT_PUBLIC_DRIVER_EMAIL || "contact@audovtc.fr",

  // Tarification
  pricePerKm: parseFloat(process.env.NEXT_PUBLIC_DRIVER_PRICE_PER_KM || "1.80"),
  minPrice: parseFloat(process.env.NEXT_PUBLIC_DRIVER_MIN_PRICE || "15"),
  depositPercent: parseFloat(process.env.NEXT_PUBLIC_DRIVER_DEPOSIT_PERCENT || "30"),

  // Zones desservies (séparées par des virgules)
  zones: (process.env.NEXT_PUBLIC_DRIVER_ZONES || "Saint-Omer,Calais,Boulogne-sur-Mer,Dunkerque,Hazebrouck,Béthune,Lille").split(",").map(z => z.trim()),

  // Domaine
  domain: process.env.NEXT_PUBLIC_DRIVER_DOMAIN || "audovtc.fr",
  domainApp: process.env.NEXT_PUBLIC_DRIVER_DOMAIN_APP || "audovtc.com",

  // Couleurs (optionnel, défaut = gold)
  colorPrimary: process.env.NEXT_PUBLIC_COLOR_PRIMARY || "#C9A84C",
  colorPrimaryLight: process.env.NEXT_PUBLIC_COLOR_PRIMARY_LIGHT || "#E8D48B",
  colorPrimaryDark: process.env.NEXT_PUBLIC_COLOR_PRIMARY_DARK || "#A07D2E",
} as const;

export function calculatePrice(distanceKm: number): number {
  const price = distanceKm * config.pricePerKm;
  return Math.max(price, config.minPrice);
}

export function calculateDeposit(totalPrice: number): number {
  return Math.ceil(totalPrice * config.depositPercent / 100);
}
