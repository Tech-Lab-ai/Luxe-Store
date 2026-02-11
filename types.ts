
export enum AppView {
  // 1. Institucional
  STOREFRONT = 'STOREFRONT',
  ABOUT = 'ABOUT',
  BLOG = 'BLOG',
  BLOG_ARTICLE = 'BLOG_ARTICLE',
  FAQ = 'FAQ',
  POLICIES = 'POLICIES',
  TERMS = 'TERMS',

  // 2. Autenticação
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  RECOVER_PASSWORD = 'RECOVER_PASSWORD',
  ADMIN_LOGIN = 'ADMIN_LOGIN',

  // 3. Catálogo
  CUSTOMIZER = 'CUSTOMIZER',
  CART = 'CART',
  CATEGORY = 'CATEGORY', // Rota Universal Única

  // 4. Checkout
  CHECKOUT_ID = 'CHECKOUT_ID',
  CHECKOUT_FULFILLMENT = 'CHECKOUT_FULFILLMENT',
  CHECKOUT_PAYMENT = 'CHECKOUT_PAYMENT',
  CHECKOUT_PROCESSING = 'CHECKOUT_PROCESSING',

  // 5. Pós-Venda
  ORDER_SUCCESS = 'ORDER_SUCCESS',
  ORDER_DENIED = 'ORDER_DENIED',
  ORDER_TRACKING = 'ORDER_TRACKING',
  ORDER_MAP = 'ORDER_MAP',
  ORDER_NPS = 'ORDER_NPS',

  // 6. Painel do Cliente
  CUSTOMER_DASHBOARD = 'CUSTOMER_DASHBOARD',
  
  // 7. Painel Administrativo
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD',
  
  // Extra
  STYLE_GUIDE = 'STYLE_GUIDE',
  EMAIL_PREVIEW = 'EMAIL_PREVIEW'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  badge?: string;
  bgColor?: string;
}

export interface CategoryMetadata {
  name: string;
  icon: string;
  slug: string;
  image: string;
  bannerImage: string;
  description: string;
  accentColor?: string;
}

export interface Addon {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  product: Product;
  size?: string;
  addons: Addon[];
  quantity: number;
  totalPrice: number;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
}

export interface Order {
  id: string;
  customer: string;
  total: number;
  status: 'Pendente' | 'Pago' | 'Enviado' | 'Entregue' | 'Cancelado';
  date: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount: string;
  usage: number;
  active: boolean;
}
