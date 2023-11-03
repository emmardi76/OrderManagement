import { AxiosResponse } from "axios";
import { Order } from "../../Models/Order";
import { OrderQuery } from "../../Models/OrderQuery";
import axios from "./axiosServices";
import service from "./axiosServices";
import { OrderList } from "../../Models/OrderList";
import { OrderUpdate } from "../../Models/OrderUpdate";

export function getOrders(
  search?: OrderQuery
): Promise<AxiosResponse<OrderList[]>> {
  let url = "Order/GetOrders";
  if (search) {
    var queryParameters = Object.entries(search)
      .map((e) => e.join("="))
      .join("&");

    url = `${url}?${queryParameters}`;
  }
  return service.get(url);
}

export function getOrder(id: number): Promise<AxiosResponse<Order>> {
  let url = `Order/GetOrder/${id}`;
  return service.get(url);
}

export function addOrder(order: Order): Promise<AxiosResponse<Order>> {
  return axios.post("Order", order);
}

export function updateOrder(order: OrderUpdate): Promise<AxiosResponse<Order>> {
  return axios.put("Order", order);
}

export function deleteOrder(id: number): Promise<AxiosResponse<Order>> {
  return axios.delete(`Order/${id}`);
}
