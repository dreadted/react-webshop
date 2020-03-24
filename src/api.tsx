import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://medieinstitutet-wie-products.azurewebsites.net/api",
  responseType: "json",
  headers: { "Content-Type": "application/json" }
});

export const getMovieCategories = async () => {
  try {
    const response = await apiClient.get<MovieCategory[]>("/categories");
    const categories = response.data;
    if (categories && categories.length)
      localStorage.setItem("categories", JSON.stringify(categories));
    return categories;
  } catch (err) {
    const categories = localStorage.getItem("categories");
    if (categories && categories.length)
      return JSON.parse(categories) as MovieCategory[];
    if (err && err.response) return err.response.data;
    throw err;
  }
};

export const getMovies = async () => {
  try {
    const response = await apiClient.get<Movie[]>("/products");
    const movies = response.data;
    if (movies && movies.length)
      localStorage.setItem("movies", JSON.stringify(movies));
    return movies;
  } catch (err) {
    const movies = localStorage.getItem("movies");
    if (movies && movies.length) return JSON.parse(movies) as Movie[];
    if (err && err.response) return err.response.data;
    throw err;
  }
};
