import axios from "./axiosServices";
import { RegisterUser } from "../../Models/RegisterUser";
import { LoginUser } from "../../Models/LoginUser";
import { User } from "../../Models/User";
import { AxiosResponse } from "axios";
import { UserQuery } from "../../Models/UserQuery";
import service from "./axiosServices";

export function register(user: RegisterUser) {
  //return axios.post(`User/RegisterUser&password=${user.password}`, user);
  return axios.post("User/RegisterUser", user);
}

export async function login(login: LoginUser) {
  return axios.post("User/LoginUser", login);
}

export function getUser(): number {
  let userId = 0;
  const userIdString = localStorage.getItem("userId");
  if (userIdString) {
    userId = parseInt(userIdString);
  }
  return userId;
}

export function getUsers(search?: UserQuery): Promise<AxiosResponse<User[]>> {
  let url = "User/GetUsers";
  if (search) {
    var queryParameters = Object.entries(search)
      .map((e) => e.join("="))
      .join("&");

    url = `${url}?${queryParameters}`;
  }
  return service.get(url);
}

export function updateUser(user: RegisterUser): Promise<AxiosResponse<User>> {
  return axios.put("User", user);
}

export function deleteUser(id: number): Promise<AxiosResponse<User>> {
  return axios.delete(`User/${id}`);
}
