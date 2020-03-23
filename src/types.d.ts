type MovieCategory = {
  id: number;
  name: string;
  slug?: string;
};

type ProductCategory = {
  categoryId: number;
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
