// /types/index.ts

export type Vendor = {
  id: number;
  name: string;
  cuisine: string;
  location: string;
  rating: number;
};

export type Carpool = {
  id: number;
  driver: string;
  from: string;
  to: string;
  date: string;
  seats: number;
};
