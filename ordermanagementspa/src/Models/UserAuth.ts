import { User } from "./User";

export interface UserAuth extends User {
  token: string;
}
