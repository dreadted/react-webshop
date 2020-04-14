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
  modal: ModalProps;
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
  response?: string;
};

type UpdateParams = {
  items?: CartItem[];
  item?: CartItem;
  order?: Order;
  product?: Product;
  quantity?: number;
};

type UpdateItem = (params: UpdateParams) => void;

type Company = {
  id: number;
  name: string;
  slug?: string;
};

type HandleChange = (e: ChangeEvent<HTMLInputElement>, params?: any) => void;
type HandleSubmit = (e: FormEvent<HTMLFormElement>, params?: any) => void;
type HandleClick = (
  e: MouseEvent<HTMLButtonElement, MouseEvent>,
  params?: any
) => void;

type Video = { url: string; poster: string };

type ModalProps = {
  caption: string;
  labelConfirm: string;
  labelCancel: string;
  item?: CartItem;
  show: boolean;
};
