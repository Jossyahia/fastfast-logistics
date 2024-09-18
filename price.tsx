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
const mediumPriceLocations = ["mosugar", "ugberikoko"];

export const priceList: PriceEntry[] = [
  { locations: { from: "amukpe", to: "torpical" }, price: DEFAULT_PRICE },
  // Remove all other specific price entries as they will now be handled by the new pricing logic
];

export function getPrice(from: string, to: string): number {
  const normalizedFrom = from.trim().toLowerCase();
  const normalizedTo = to.trim().toLowerCase();

  if (
    higherPriceLocations.some(
      (loc) => normalizedFrom.includes(loc) || normalizedTo.includes(loc)
    )
  ) {
    return HIGHER_PRICE;
  }

  if (
    mediumPriceLocations.some(
      (loc) => normalizedFrom.includes(loc) || normalizedTo.includes(loc)
    )
  ) {
    return MEDIUM_PRICE;
  }

  return DEFAULT_PRICE;
}

export function getLocations(): string[] {
  const locations = new Set<string>();
  priceList.forEach((entry) => {
    locations.add(entry.locations.from);
    locations.add(entry.locations.to);
  });
  // Add the special locations to the set
  higherPriceLocations.forEach((loc) => locations.add(loc));
  mediumPriceLocations.forEach((loc) => locations.add(loc));
  return Array.from(locations);
}
