import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://medieinstitutet-wie-products.azurewebsites.net/api",
  responseType: "json",
  headers: { "Content-Type": "application/json" }
});

export const get = async <T extends {}>(slug: string) => {
  try {
    const response = await apiClient.get<T[]>(`/${slug}`);
    const data = response.data;
    if (data && data.length) localStorage.setItem(slug, JSON.stringify(data));
    return data;
  } catch (err) {
    const data = localStorage.getItem(slug);
    if (data && data.length) return JSON.parse(data) as T[];
    if (err && err.response) return err.response.data;
    throw err;
  }
};

export const save = async <T extends {}>(input: T, slug: string) => {
  try {
    const response = await apiClient.post<T>(`/${slug}`, input);
    const data = response.data;
    return data;
  } catch (err) {
    if (err & err.response) return err.response.data;
    throw err;
  }
};
