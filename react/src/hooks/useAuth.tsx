import React, { useState, useContext, createContext } from "react";
import useStateWithLocalStorage from "./useStateWithLocalStorage";

interface IAuthContext {
  login: (email: string, password: string) => Promise<null | { error: string }>;
  logout: any;
  loading: any;
  error: any;
  isLoggedin: any;
  token: any;
}

const authContext = createContext<IAuthContext | null>(null);

function useProvideAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | { error: string }>(null);
  const [token, setToken] = useStateWithLocalStorage("token");

  async function login(
    email: string,
    password: string
  ): Promise<null | { error: string }> {
    setLoading(true);
    setError(null);
    setToken("");
    try {
      let response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        let result = await response.json();
        setToken(result.token);
        setLoading(false);
      } else {
        let result = await response.json();
        setError(result);
        setLoading(false);
        return result;
      }
    } catch {
      const err = { error: "Couldn't reach the server" };
      setError(err);
      setLoading(false);
      return err;
    }
    return null;
  }

  function logout() {
    setToken("");
    setError(null);
    setLoading(false);
  }

  return {
    login,
    logout,
    loading,
    error,
    isLoggedin: token !== "",
    token,
  };
}

export const AuthProvider = ({ children }: { children: any }) => (
  <authContext.Provider value={useProvideAuth()}>
    {children}
  </authContext.Provider>
);

export const useAuth = () => {
  return useContext(authContext);
};
