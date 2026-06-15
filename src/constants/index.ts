export const SITE_CONFIG = {
  name: "Cielo Fashion Boutique",
  tagline: "Crafted in Rwanda, Inspired by Style.",
  url: "https://cielofashion.rw",
  description:
    "Rwanda's premier luxury fashion boutique. Discover exclusive collections, custom tailoring, and premium African fashion.",
  email: "hello@cielofashion.rw",
  phone: "+250 788 000 000",
  whatsapp: "+250788000000",
  address: "KN 5 Rd, Kigali, Rwanda",
  social: {
    instagram: "https://instagram.com/cielofashionrw",
    facebook: "https://facebook.com/cielofashionrw",
    twitter: "https://twitter.com/cielofashionrw",
    tiktok: "https://tiktok.com/@cielofashionrw",
    pinterest: "https://pinterest.com/cielofashionrw",
  },
};

export const COLLECTIONS = [
  {
    id: "women",
    name: "Women",
    description: "Elegance redefined for the modern woman",
    href: "/women",
    image: "/collections/women.jpg",
    color: "#1a6b3c",
  },
  {
    id: "men",
    name: "Men",
    description: "Sharp tailoring for the distinguished gentleman",
    href: "/men",
    image: "/collections/men.jpg",
    color: "#0f4025",
  },
  {
    id: "kids",
    name: "Kids",
    description: "Adorable fashion for little ones",
    href: "/kids",
    image: "/collections/kids.jpg",
    color: "#c9a84c",
  },
  {
    id: "african",
    name: "African",
    description: "Contemporary African luxury fashion",
    href: "/african",
    image: "/collections/african.jpg",
    color: "#8f6f2a",
  },
];

export const WOMEN_CATEGORIES = [
  "Dresses",
  "Maxi Dresses",
  "Skirts",
  "Blouses",
  "Two-Piece Sets",
  "Jumpsuits",
  "Kaftans",
  "Jackets",
];

export const MEN_CATEGORIES = [
  "Suits",
  "Shirts",
  "Trousers",
  "Traditional Wear",
  "Casual Wear",
  "Jackets",
];

export const KIDS_CATEGORIES = ["Boys Clothing", "Girls Clothing", "Custom Kids Wear"];

export const AFRICAN_CATEGORIES = [
  "Kitenge Fashion",
  "Ankara Fashion",
  "Dashiki Fashion",
  "Contemporary African",
  "Luxury African Collections",
];

export const FABRIC_TYPES = [
  { id: "kitenge", name: "Kitenge", origin: "East African" },
  { id: "ankara", name: "Ankara", origin: "West African" },
  { id: "cotton", name: "Cotton", origin: "Natural Fiber" },
  { id: "satin", name: "Satin", origin: "Synthetic Weave" },
  { id: "lace", name: "Lace", origin: "Traditional" },
  { id: "silk", name: "Silk", origin: "Natural Fiber" },
  { id: "chiffon", name: "Chiffon", origin: "Lightweight Fabric" },
];

export const TAILORING_STATUSES = [
  { key: "REQUEST_RECEIVED", label: "Request Received", step: 1 },
  { key: "MEASUREMENT_REVIEW", label: "Measurement Review", step: 2 },
  { key: "QUOTATION_SENT", label: "Quotation Sent", step: 3 },
  { key: "CUSTOMER_APPROVED", label: "Customer Approved", step: 4 },
  { key: "FABRIC_PREPARATION", label: "Fabric Preparation", step: 5 },
  { key: "CUTTING", label: "Cutting", step: 6 },
  { key: "SEWING", label: "Sewing", step: 7 },
  { key: "QUALITY_CONTROL", label: "Quality Control", step: 8 },
  { key: "READY_FOR_PICKUP", label: "Ready for Pickup", step: 9 },
  { key: "OUT_FOR_DELIVERY", label: "Out for Delivery", step: 10 },
  { key: "DELIVERED", label: "Delivered", step: 11 },
];

export const PAYMENT_METHODS = [
  {
    id: "MTN_MOMO",
    name: "MTN MoMo",
    description: "Pay with MTN Mobile Money",
    icon: "/payments/mtn-momo.png",
  },
  {
    id: "AIRTEL_MONEY",
    name: "Airtel Money",
    description: "Pay with Airtel Money",
    icon: "/payments/airtel-money.png",
  },
  {
    id: "VISA",
    name: "Visa",
    description: "Pay with Visa card",
    icon: "/payments/visa.png",
  },
  {
    id: "MASTERCARD",
    name: "Mastercard",
    description: "Pay with Mastercard",
    icon: "/payments/mastercard.png",
  },
  {
    id: "BANK_TRANSFER",
    name: "Bank Transfer",
    description: "Direct bank transfer",
    icon: "/payments/bank.png",
  },
];

export const ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  MANAGER: "manager",
  TAILOR: "tailor",
  SALES_STAFF: "sales_staff",
  CUSTOMER: "customer",
};

export const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "rw", name: "Kinyarwanda", flag: "🇷🇼" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

export const SIZES = {
  CLOTHING: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  SHOES: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
};

export const COLORS = {
  emerald: "#1a6b3c",
  gold: "#c9a84c",
  champagne: "#f0d98b",
  ivory: "#f5f0e8",
  black: "#0a0a0a",
  white: "#ffffff",
};
