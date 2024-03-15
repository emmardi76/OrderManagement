import axios, { AxiosResponse } from "axios";
import service from "./axiosServices";
import { InvoiceQuery } from "../../Models/InvoiceQuery";
import { InvoiceList } from "../../Models/InvoiceList";
import { Invoice } from "../../Models/Invoice";
import { InvoiceUpdate } from "../../Models/InvoiceUpdate";

export function getInvoices(
  search?: InvoiceQuery
): Promise<AxiosResponse<InvoiceList[]>> {
  let url = "Invoice/GetInvoices";
  if (search) {
    var queryParameters = Object.entries(search)
      .map((e) => e.join("="))
      .join("&");

    url = `${url}?${queryParameters}`;
  }
  return service.get(url);
}

export function getInvoice(id: number): Promise<AxiosResponse<Invoice>> {
  let url = `Invoice/GetInvoice/${id}`;
  return service.get(url);
}

export function addInvoice(invoice: Invoice): Promise<AxiosResponse<Invoice>> {
  return axios.post("Invoice", invoice);
}

export function updateInvoice(
  invoice: InvoiceUpdate
): Promise<AxiosResponse<Invoice>> {
  return axios.put("Invoice", invoice);
}

export function deleteInvoice(id: number): Promise<AxiosResponse<Invoice>> {
  return axios.delete(`Invoice/${id}`);
}
