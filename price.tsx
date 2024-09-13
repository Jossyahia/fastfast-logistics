// prices.ts

interface LocationPair {
  from: string;
  to: string;
}

interface PriceEntry {
  locations: LocationPair;
  price: number;
}

export const priceList: PriceEntry[] = [
  { locations: { from: "amukpe", to: "torpical" }, price: 1000 },
  { locations: { from: "amukpe", to: "nddc" }, price: 1000 },
  { locations: { from: "amukpe", to: "okpe road" }, price: 1200 },
  { locations: { from: "amukpe", to: "ajogodo" }, price: 1200 },
  { locations: { from: "amukpe", to: "okirigwe" }, price: 1200 },
  { locations: { from: "amukpe", to: "olympia" }, price: 1200 },
  { locations: { from: "amukpe", to: "mtn road" }, price: 1200 },
  { locations: { from: "amukpe", to: "okirigwe park" }, price: 1200 },
  { locations: { from: "amukpe", to: "market" }, price: 1500 },
  { locations: { from: "amukpe", to: "ogorode" }, price: 1500 },
  { locations: { from: "amukpe", to: "uton" }, price: 2000 },
  { locations: { from: "amukpe", to: "jese" }, price: 2000 },
  { locations: { from: "amukpe", to: "mosugar" }, price: 2000 },
  // Include the previously defined routes
];

export const DEFAULT_PRICE = 1000;

export function getPrice(from: string, to: string): number {
  const normalizedFrom = from.trim().toLowerCase();
  const normalizedTo = to.trim().toLowerCase();

  const priceEntry = priceList.find(
    (entry) =>
      (entry.locations.from.includes(normalizedFrom) &&
        entry.locations.to.includes(normalizedTo)) ||
      (entry.locations.from.includes(normalizedTo) &&
        entry.locations.to.includes(normalizedFrom))
  );

  return priceEntry ? priceEntry.price : DEFAULT_PRICE;
}

export function getLocations(): string[] {
  const locations = new Set<string>();
  priceList.forEach((entry) => {
    locations.add(entry.locations.from);
    locations.add(entry.locations.to);
  });
  return Array.from(locations);
}
