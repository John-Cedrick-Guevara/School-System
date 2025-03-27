import { createContext, useContext } from "react";
import { User } from "../interfaces";



export const UserContext = createContext<User | null>(null);

export function useUser() {
  return useContext(UserContext);
}
