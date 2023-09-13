import { AxiosResponse } from "axios";
import { TaxType } from "../../Models/TaxType";
import axios from "./axiosServices";
import service from "./axiosServices";
import { TaxTypeQuery } from "../../Models/TaxTypeQuery";

export function GetTaxes(
  search?: TaxTypeQuery
): Promise<AxiosResponse<TaxType[]>> {
  let url = "TaxType/GetTaxes";
  if (search) {
    var queryParameters = Object.entries(search)
      .map((e) => e.join("="))
      .join("&");

    url = `${url}?${queryParameters}`;
  }
  console.log(url);
  return service.get(url);
}
export function AddTaxType(taxType: TaxType): Promise<AxiosResponse<TaxType>> {
  return axios.post("TaxType", taxType);
}

export function UpdateTaxType(
  taxType: TaxType
): Promise<AxiosResponse<TaxType>> {
  return axios.put("TaxType", taxType);
}

export function DeleteTaxType(id: number): Promise<AxiosResponse<TaxType>> {
  return axios.delete(`TaxType/${id}`);
}
