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

type Cart = {
  items: Map<Movie, number>;
  articles: number;
  subTotal: number;
  openState: boolean;
};

type CartItem = {
  movie: Movie;
  quantity: number;
};

type AddToCart = (movie: Movie, quantity: number) => void;
