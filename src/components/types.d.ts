/** Product types */
type ProductCategory = {
  id: number;
  name: string;
  slug?: string;
};

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  year: number;
  added: Date;
  productCategory: APIProductCategory[];
};

type APIProductCategory = {
  categoryId: number;
};

/** Cart types */
type Cart = {
  items: Map<Product, number>;
  articles: number;
  subTotal: number;
  blink: boolean;
  open: boolean;
};

type CartItem = {
  product: Product;
  quantity: number;
};

type AddToCart = (product: Product, quantity: number) => void;
type UpdateCart = (product: Product, quantity: number) => void;

/** Order types */
type Order = {
  id?: number;
  companyId: number;
  created: string;
  createdBy: string;
  paymentMethod: string;
  totalPrice: number;
  status?: number;
  orderRows?: OrderRow[];
};

type OrderRow = {
  productId: number;
  orderId?: number;
  amount: number;
};

type OrderErrors = {
  companyId?: string;
  createdBy?: string;
  paymentMethod?: string;
};

type HandleChange = (e: ChangeEvent<HTMLInputElement>) => void;
type HandleSubmit = (e: FormEvent<HTMLFormElement>) => void;

type Video = { url: string; poster: string };
