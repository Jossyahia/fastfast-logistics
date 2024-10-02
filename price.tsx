interface LocationPair {
  from: string;
  to: string;
}

interface PriceEntry {
  locations: LocationPair;
  price: number;
}

export const DEFAULT_PRICE = 1000;
export const HIGHER_PRICE = 2000;
export const MEDIUM_PRICE = 1500;

const higherPriceLocations = ["uton", "jese"];
const mediumPriceLocations = ["mosugar", "ugberikoko", "Ghana", "Ogorode"];

export const priceList: PriceEntry[] = [
  { locations: { from: "amukpe", to: "torpical" }, price: DEFAULT_PRICE },
  // Add more specific price entries if needed
];

function normalizeLocation(location: string): string {
  return location.trim().toLowerCase();
}

function locationIncludes(location: string, keywordList: string[]): boolean {
  const normalizedLocation = normalizeLocation(location);
  return keywordList.some((keyword) => normalizedLocation.includes(keyword));
}

export function getPrice(from: string, to: string): number {
  const normalizedFrom = normalizeLocation(from);
  const normalizedTo = normalizeLocation(to);

  // Check for specific price entries
  const specificEntry = priceList.find(
    (entry) =>
      (normalizedFrom === normalizeLocation(entry.locations.from) &&
        normalizedTo === normalizeLocation(entry.locations.to)) ||
      (normalizedFrom === normalizeLocation(entry.locations.to) &&
        normalizedTo === normalizeLocation(entry.locations.from))
  );

  if (specificEntry) {
    return specificEntry.price;
  }

  // Check for higher price locations
  if (
    locationIncludes(normalizedFrom, higherPriceLocations) ||
    locationIncludes(normalizedTo, higherPriceLocations)
  ) {
    return HIGHER_PRICE;
  }

  // Check for medium price locations
  if (
    locationIncludes(normalizedFrom, mediumPriceLocations) ||
    locationIncludes(normalizedTo, mediumPriceLocations)
  ) {
    return MEDIUM_PRICE;
  }

  // Default price
  return DEFAULT_PRICE;
}

export function getLocations(): string[] {
  const locations = new Set<string>();
  priceList.forEach((entry) => {
    locations.add(entry.locations.from);
    locations.add(entry.locations.to);
  });
  higherPriceLocations.forEach((loc) => locations.add(loc));
  mediumPriceLocations.forEach((loc) => locations.add(loc));
  return Array.from(locations);
}
