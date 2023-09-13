import axios from "./axiosServices";
import { RegisterUser } from "../../Models/RegisterUser";
import { LoginUser } from "../../Models/LoginUser";

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
