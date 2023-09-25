import axios, { AxiosResponse } from "axios";
import { OrderLine } from "../../Models/OrderLine";
import service from "./axiosServices";
import { OrderLineQuery } from "../../Models/OrderLineQuery";

export function getOrderLines(
  search?: OrderLineQuery
): Promise<AxiosResponse<OrderLine[]>> {
  let url = "OrderLine/GetOrderLines";
  if (search) {
    var queryParameters = Object.entries(search)
      .map((e) => e.join("="))
      .join("&");

    url = `${url}?${queryParameters}`;
  }
  return service.get(url);
}

export function addOrderLine(
  orderLine: OrderLine
): Promise<AxiosResponse<OrderLine>> {
  return axios.post("OrderLine", orderLine);
}

export function updateOrderLine(
  orderLine: OrderLine
): Promise<AxiosResponse<OrderLine>> {
  return axios.put("OrderLine", orderLine);
}

export function deleteOrderLine(id: number): Promise<AxiosResponse<OrderLine>> {
  return axios.delete(`OrderLine/${id}`);
}
