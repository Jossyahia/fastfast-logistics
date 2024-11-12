interface LocationPair {
  from: string;
  to: string;
}

interface PriceEntry {
  locations: LocationPair;
  price: number;
}

export const DEFAULT_PRICE = 1200;
export const HIGHER_PRICE = 2000;
export const MEDIUM_PRICE = 1500;
export const LOWER_PRICE = 1000;

const higherPriceLocations = new Set(["uton", "jese"]);
const mediumPriceLocations = new Set([
  "mosugar",
  "ugberikoko",
  "Ghana",
  "Ogorode",
  "urakpa",
  "orakpa"
]);
const lowerPriceLocations = new Set([
  "amukpe",
  "torpical",
  "shell road",
  "new road",
  "okirigwe park",
  "ugbeyin",
  "mountain of fire",
  "ajogodo",
  ""
]);

export const priceList: PriceEntry[] = [
  {
    locations: { from: "amukpe roundabout", to: "urakpa" },
    price: HIGHER_PRICE,
  },
  {
    locations: { from: "amukpe roundabout", to: "ogorode" },
    price: HIGHER_PRICE,
  },
  {
    locations: { from: "urakpa", to: "okirigwe" },
    price: HIGHER_PRICE,
  },
  {
    locations: { from: "orakpa", to: "ogorode" },
    price: MEDIUM_PRICE,
  },
  {
    locations: { from: "orakpa", to: "shell road" },
    price: MEDIUM_PRICE,
  },
  {
    locations: { from: "amukpe roundabout", to: "uton" },
    price: HIGHER_PRICE,
  },
];

function normalizeLocation(location: string): string {
  return location.trim().toLowerCase();
}

function locationIncludes(location: string, keywordSet: Set<string>): boolean {
  const normalizedLocation = normalizeLocation(location);
  return keywordSet.has(normalizedLocation);
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

  // Check for lower price locations
  if (
    locationIncludes(normalizedFrom, lowerPriceLocations) ||
    locationIncludes(normalizedTo, lowerPriceLocations)
  ) {
    return LOWER_PRICE;
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
  lowerPriceLocations.forEach((loc) => locations.add(loc));
  return Array.from(locations);
}
