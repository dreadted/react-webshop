import axios, { AxiosInstance } from "axios";
import { APP_INFO } from "./utils";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://dreadnallen-react-webshop.firebaseapp.com/api/v1",
  responseType: "json",
  headers: { "Content-Type": "application/json" }
});

export const get = async <T extends {}>(
  slug: string,
  cache: boolean = false
) => {
  try {
    const response = await apiClient.get<T[]>(`/${slug}`);
    const data = response.data;
    if (data && data.length && cache)
      localStorage.setItem(`${APP_INFO.name}.${slug}`, JSON.stringify(data));
    return data;
  } catch (err) {
    const data = localStorage.getItem(`${APP_INFO.name}.${slug}`);
    if (data && data.length) return JSON.parse(data) as T[];
    if (err && err.response) return err.response.data;
    throw err;
  }
};

export const save = async <T extends {}>(
  input: T,
  slug: string,
  id?: number
) => {
  try {
    if (id) {
      const response = await apiClient.put<T>(`/${slug}/${id}`, input);
      return { status: response.status, data: response.data };
    } else {
      const response = await apiClient.post<T>(`/${slug}`, input);
      return { status: response.status, data: response.data };
    }
  } catch (err) {
    if (err && err.response) return err.response;
    throw err;
  }
};

export const del = async <T extends {}>(slug: string, id: number) => {
  try {
    const response = await apiClient.delete(`/${slug}/${id}`);
    return response;
  } catch (err) {
    if (err && err.response) return err.response;
    throw err;
  }
};

export const fetchBLOB = async (url: string) => {
  const client: AxiosInstance = axios.create({
    responseType: "blob",
    headers: { "Content-Type": "video/x-matroska" }
  });

  try {
    const response = await client.get(url);
    return response.data;
  } catch (err) {
    if (err && err.response) return err.response.data;
    throw err;
  }
};
