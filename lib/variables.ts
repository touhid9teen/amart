import {
  Apple,
  Egg,
  Drumstick,
  Fish,
  Croissant,
  Soup,
  Snowflake,
  UtensilsCrossed,
  Coffee,
  Cookie,
  CupSoda,
  Sparkles,
  ChefHat,
  Baby,
  Heart,
  Home,
  Smile,
  PawPrint,
  LucideIcon,
  Wine
} from "lucide-react";

export const sliderList = [
  {
    id: 1,
    name: "Slider 2",
    image: [{ url: "/slider/slider-2.webp" }],
  },
  {
    id: 2,
    name: "Slider 3",
    image: [{ url: "/slider/slider-3.webp" }],
  },
];

export const searchItems = [
  'Search "milk"',
  'Search "bread"',
  'Search "sugar"',
  'Search "butter"',
  'Search "paneer"',
  'Search "chocolate"',
  'Search "curd"',
  'Search "rice"',
  'Search "egg"',
  'Search "chips"',
];

export const countryCodes = [
  { code: "+880", country: "BD", name: "Bangladesh" },
];

const rawBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
let baseUrl = rawBaseUrl || "";

if (baseUrl && (baseUrl.includes("\n") || baseUrl.startsWith("#"))) {
  const match = baseUrl.match(/https?:\/\/[^\s"']+/);
  if (match) {
    baseUrl = match[0];
  }
}

export const BASE_URL = baseUrl;

// Category Types and Data
export type CategoryItem = {
  name: string;
  icon: LucideIcon;
  slug: string;
};

export const categories: CategoryItem[] = [
  { name: "Fruits And Vegetables", icon: Apple, slug: "fruits-and-vegetables" },
  { name: "Dairy And Eggs", icon: Egg, slug: "dairy-and-eggs" },
  { name: "Meat And Poultry", icon: Drumstick, slug: "meat-and-poultry" },
  { name: "Seafood", icon: Fish, slug: "seafood" },
  { name: "Bakery And Bread", icon: Croissant, slug: "bakery-and-bread" },
  { name: "Canned Goods", icon: Soup, slug: "canned-goods" },
  { name: "Frozen Foods", icon: Snowflake, slug: "frozen-foods" },
  { name: "Pasta And Rice", icon: UtensilsCrossed, slug: "pasta-and-rice" },
  { name: "Breakfast Foods", icon: Coffee, slug: "breakfast-foods" },
  { name: "Snacks And Chips", icon: Cookie, slug: "snacks-and-chips" },
  { name: "Beverages", icon: CupSoda, slug: "beverages" },
  { name: "Condiments And Sauces", icon: Wine, slug: "condiments-and-sauces" },
  { name: "Spices And Seasonings", icon: Sparkles, slug: "spices-and-seasonings" },
  { name: "Baking Supplies", icon: ChefHat, slug: "baking-supplies" },
  { name: "Baby Food And Formula", icon: Baby, slug: "baby-food-and-formula" },
  { name: "Health And Wellness", icon: Heart, slug: "health-and-wellness" },
  { name: "Household Supplies", icon: Home, slug: "household-supplies" },
  { name: "Personal Care", icon: Smile, slug: "personal-care" },
  { name: "Pet Foods", icon: PawPrint, slug: "pet-foods" },
];
