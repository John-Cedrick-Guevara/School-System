import { createContext, useContext } from "react";

interface user {
  email: string;
  id: string;
  name: string;
  password: string;
  role: string;
  sectionId: string;
}

export const UserContext = createContext<user | null>(null);

export function useUser() {
  return useContext(UserContext);
}
