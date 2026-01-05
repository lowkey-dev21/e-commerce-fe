// Import product images
import product1 from "../assets/images/product1.png";
import product2 from "../assets/images/product2.png";
import product3 from "../assets/images/product3.png";
import product4 from "../assets/images/product4.png";
import product5 from "../assets/images/product5.png";
import product6 from "../assets/images/product6.png";
import product7 from "../assets/images/product7.png";
import product8 from "../assets/images/product8.png";
import product9 from "../assets/images/product9.png";
import product10 from "../assets/images/product10.png";
import product11 from "../assets/images/product11.png";

// Product interface
export interface Product {
  id: number;
  image: string;
  type: string;
  name: string;
  price: string;
  category: string;
  description?: string;
  colors?: string[];
  images?: string[];
}

// Categories constant
export const CATEGORIES = [
  "NEW",
  "SHIRTS",
  "POLO SHIRTS",
  "SHORTS",
  "SUITS",
  "BEST SELLERS",
  "T-SHIRTS",
  "JEANS",
  "JACKETS",
  "COATS",
] as const;

// Sizes constant
export const SIZES = ["XS", "S", "M", "L", "XL", "2X"] as const;

// Product data array
export const PRODUCTS: Product[] = [
  {
    id: 1,
    image: product1,
    type: "Cotton T Shirt",
    name: "Basic Slim Fit T-Shirt",
    price: "$ 199",
    category: "T-SHIRTS",
  },
  {
    id: 2,
    image: product2,
    type: "Crewneck T-Shirt",
    name: "Basic Heavy Weight T-Shirt",
    price: "$ 199",
    category: "T-SHIRTS",
    images: []
  },
  {
    id: 3,
    image: product3,
    type: "Cotton T Shirt",
    name: "Full Sleeve Zipper",
    price: "$ 199",
    category: "SHIRTS",
  },
  {
    id: 4,
    image: product4,
    type: "Cotton T Shirt",
    name: "Full Sleeve Zipper",
    price: "$ 199",
    category: "T-SHIRTS",
  },
  {
    id: 5,
    image: product5,
    type: "Cotton T Shirt",
    name: "Basic Slim Fit T-Shirt",
    price: "$ 199",
    category: "POLO SHIRTS",
  },
  {
    id: 6,
    image: product6,
    type: "Cotton T Shirt",
    name: "Full Sleeve Zipper",
    price: "$ 199",
    category: "T-SHIRTS",
  },
  {
    id: 7,
    image: product7,
    type: "Cotton T Shirt",
    name: "Full Sleeve Zipper",
    price: "$ 199",
    category: "SHIRTS",
  },
  {
    id: 8,
    image: product8,
    type: "Cotton T Shirt",
    name: "Full Sleeve Zipper",
    price: "$ 199",
    category: "T-SHIRTS",
  },
  {
    id: 9,
    image: product9,
    type: "Cotton T Shirt",
    name: "Full Sleeve Zipper",
    price: "$ 199",
    category: "JEANS",
  },
  {
    id: 10,
    image: product10,
    type: "Cotton T Shirt",
    name: "Full Sleeve Zipper",
    price: "$ 199",
    category: "JACKETS",
  },
  {
    id: 11,
    image: product11,
    type: "Cotton T Shirt",
    name: "Full Sleeve Zipper",
    price: "$ 199",
    category: "COATS",
  },
];

export type Category = typeof CATEGORIES[number];
export type Size = typeof SIZES[number];