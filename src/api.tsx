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
    return categories;
  } catch (err) {
    if (err && err.response) {
      return err.response.data;
    }
    throw err;
  }
};
