type MovieCategory = {
  id: number;
  name: string;
};

type Movie = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  year: number;
  added: Date;
  productCategory: MovieCategory[];
};
