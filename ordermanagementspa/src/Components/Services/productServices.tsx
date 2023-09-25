import { Product } from "../../Models/Product";
import { ProductQuery } from "../../Models/ProductQuery";
import axios from "./axiosServices";
import service from "./axiosServices";
import { AxiosResponse } from "axios";

export function getProducts(
  search?: ProductQuery
): Promise<AxiosResponse<Product[]>> {
  let url = "Product/GetProducts";
  if (search) {
    var queryParameters = Object.entries(search)
      .map((e) => e.join("="))
      .join("&");

    url = `${url}?${queryParameters}`;
  }
  return service.get(url);
}

export function addProduct(product: Product): Promise<AxiosResponse<Product>> {
  return axios.post("Product", product);
}

export function updateProduct(
  product: Product
): Promise<AxiosResponse<Product>> {
  return axios.put("Product", product);
}

export function deleteProduct(id: number): Promise<AxiosResponse<Product>> {
  return axios.delete(`Product/${id}`);
}
