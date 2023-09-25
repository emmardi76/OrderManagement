import axios, { AxiosResponse } from "axios";
import { CustomerAddress } from "../../Models/CustomerAddress";
import service from "./axiosServices";
import { CustomerAddressQuery } from "../../Models/CustomerAddressQuery";

export function getCustomerAddresses(
  search?: CustomerAddressQuery
): Promise<AxiosResponse<CustomerAddress[]>> {
  let url = "CustomerAddress/GetCustomerAddresses";
  if (search) {
    var queryParameters = Object.entries(search)
      .map((e) => e.join("="))
      .join("&");

    url = `${url}?${queryParameters}`;
  }
  return service.get(url);
}

export function addCustomerAddress(
  customerAddress: CustomerAddress
): Promise<AxiosResponse<CustomerAddress>> {
  return axios.post("CustomerAddress", customerAddress);
}

export function updateCustomerAddress(
  customerAddress: CustomerAddress
): Promise<AxiosResponse<CustomerAddress>> {
  return axios.put("CustomerAddress", customerAddress);
}

export function deleteCustomerAddress(
  customerAddress: CustomerAddress
): Promise<AxiosResponse<CustomerAddress>> {
  return axios.delete(`CustomerAddress/${customerAddress.id}`);
}
