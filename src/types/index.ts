export type Locale = "en" | "rw" | "fr";

export type ProductCollection = "WOMEN" | "MEN" | "KIDS" | "AFRICAN" | "UNISEX";

export type TailoringStatus =
  | "REQUEST_RECEIVED"
  | "MEASUREMENT_REVIEW"
  | "QUOTATION_SENT"
  | "CUSTOMER_APPROVED"
  | "FABRIC_PREPARATION"
  | "CUTTING"
  | "SEWING"
  | "QUALITY_CONTROL"
  | "READY_FOR_PICKUP"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

export type PaymentMethod =
  | "MTN_MOMO"
  | "AIRTEL_MONEY"
  | "VISA"
  | "MASTERCARD"
  | "BANK_TRANSFER";

export type FabricType =
  | "KITENGE"
  | "ANKARA"
  | "COTTON"
  | "SATIN"
  | "LACE"
  | "SILK"
  | "CHIFFON"
  | "OTHER";

export interface User {
  id: string;
  email?: string;
  phone?: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  isVerified: boolean;
  roleId: string;
  role: Role;
  preferredLanguage: Locale;
  createdAt: Date;
}

export interface Role {
  id: string;
  name: string;
  label: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  comparePrice?: number;
  sku?: string;
  categoryId: string;
  category: Category;
  collection: ProductCollection;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  isActive: boolean;
  totalStock: number;
  images: ProductImage[];
  variants: ProductVariant[];
  reviews?: Review[];
  createdAt: Date;
}

export interface ProductImage {
  id: string;
  url: string;
  altText?: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ProductVariant {
  id: string;
  size?: string;
  color?: string;
  colorHex?: string;
  price?: number;
  stock: number;
  sku?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
}

export interface Review {
  id: string;
  rating: number;
  title?: string;
  body?: string;
  user: { firstName: string; lastName: string; avatar?: string };
  createdAt: Date;
}

export interface CartItem {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
}

export interface Address {
  id: string;
  label?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  district?: string;
  country: string;
  isDefault: boolean;
}

export interface Fabric {
  id: string;
  name: string;
  slug: string;
  description?: string;
  type: FabricType;
  colors?: string[];
  pricePerMeter: number;
  image?: string;
  texture?: string;
}

export interface Measurement {
  id: string;
  label?: string;
  chest?: number;
  waist?: number;
  hips?: number;
  shoulder?: number;
  sleeveLength?: number;
  inseam?: number;
  outseam?: number;
  neckCircumference?: number;
  backLength?: number;
  frontLength?: number;
  thigh?: number;
  height?: number;
  unit: string;
}

export interface TailoringRequest {
  id: string;
  requestNumber: string;
  garmentType: string;
  description?: string;
  fabric?: Fabric;
  selectedColor?: string;
  deliveryDate?: Date;
  status: TailoringStatus;
  quotedPrice?: number;
  finalPrice?: number;
  measurements?: Measurement[];
  createdAt: Date;
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: Date;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
