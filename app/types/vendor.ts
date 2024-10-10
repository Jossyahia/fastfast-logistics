export interface Vendor {
  id: number;
  name: string;
  cuisine: string;
  location: string;
  rating: number;
  likes: number;
  reviews: number;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export type MenuItems = Record<number, MenuItem[]>;
