import { User } from "./User";

export interface RegisterUser extends User {
  password: string;
}
