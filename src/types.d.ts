/** Movie types */
type MovieCategory = {
  id: number;
  name: string;
  slug?: string;
};

type Movie = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  year: number;
  added: Date;
  productCategory: ProductCategory[];
};

type ProductCategory = {
  categoryId: number;
};

/** Cart types */
type Cart = {
  items: Map<Movie, number>;
  articles: number;
  subTotal: number;
  blink: boolean;
  open: boolean;
};

type CartItem = {
  movie: Movie;
  quantity: number;
};

type AddToCart = (movie: Movie, quantity: number) => void;
type UpdateCart = (movie: Movie, quantity: number) => void;

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
type HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => void;
