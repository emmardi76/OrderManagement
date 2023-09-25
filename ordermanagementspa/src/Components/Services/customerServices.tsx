import { Customer } from "../../Models/Customer";
import { CustomerQuery } from "../../Models/CustomerQuery";
import axios from "./axiosServices";
import service from "./axiosServices";
import { AxiosResponse } from "axios";

export function getCustomers(
  search?: CustomerQuery
): Promise<AxiosResponse<Customer[]>> {
  let url = "Customer/GetCustomers";
  if (search) {
    var queryParameters = Object.entries(search)
      .map((e) => e.join("="))
      .join("&");

    url = `${url}?${queryParameters}`;
  }
  return service.get(url);
}
export function addCustomer(
  customer: Customer
): Promise<AxiosResponse<Customer>> {
  return axios.post("Customer", customer);
}

export function updateCustomer(
  customer: Customer
): Promise<AxiosResponse<Customer>> {
  return axios.put("Customer", customer);
}

export function deleteCustomer(id: number): Promise<AxiosResponse<Customer>> {
  return axios.delete(`Customer/${id}`);
}
