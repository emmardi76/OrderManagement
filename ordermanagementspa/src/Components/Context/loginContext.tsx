import React, { createContext, useState } from "react";

export interface LoginContextType {
  handleLogin: (userId: string, token: string) => void;
  userId?: string;
  setUserId?: React.Dispatch<React.SetStateAction<string>>;
  token?: string;
  setToken?: React.Dispatch<React.SetStateAction<string>>;
}

const handleLogin = (userId: string, token: string): void => {
  localStorage.setItem("userId", userId);
  localStorage.setItem("token", token);
};

export const LoginContext = createContext<LoginContextType>({
  handleLogin: handleLogin,
});

export const LoginProvider = (props: any): JSX.Element => {
  const [token, setToken] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  return (
    <LoginContext.Provider
      value={{ handleLogin, token, setToken, userId, setUserId }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
