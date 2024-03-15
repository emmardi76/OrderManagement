import service from "./axiosServices";
import { InvoiceLine } from "../../Models/InvoiceLine";
import { InvoiceLineQuery } from "../../Models/InvoiceLineQuery";
import axios, { AxiosResponse } from "axios";

export function getInvoiceLines(
  search?: InvoiceLineQuery
): Promise<AxiosResponse<InvoiceLine[]>> {
  let url = "InvoiceLine/GetInvoiceLines";
  if (search) {
    var queryParameters = Object.entries(search)
      .map((e) => e.join("="))
      .join("&");

    url = `${url}?${queryParameters}`;
  }
  return service.get(url);
}

export function addInvoiceLine(
  invoiceLine: InvoiceLine
): Promise<AxiosResponse<InvoiceLine>> {
  return axios.post("InvoiceLine", invoiceLine);
}

export function updateInvoiceLine(
  invoiceLine: InvoiceLine
): Promise<AxiosResponse<InvoiceLine>> {
  return axios.put("InvoiceLine", invoiceLine);
}

export function deleteInvoiceLine(
  id: number
): Promise<AxiosResponse<InvoiceLine>> {
  return axios.delete(`InvoiceLine/${id}`);
}
