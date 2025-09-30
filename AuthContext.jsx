import { createContext, useContext, useState } from "react";
import Tablet from "./Tablet";
import Entrance from "./Entrance";
import Tunnel from "./Tunnel";
import "./index.css";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  async function Signup(creds) {
    try {
      const res = await fetch(`${API}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creds),
      });

      const result = await res.json();

      if (res.ok) {
        setToken(result.token);
        setLocation("GATE");
      } else {
        throw Error(result.message || "Error signing up");
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function AuthN() {
    if (!token) return;
    try {
      const res = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await res.json();
      if (res.ok) {
        setLocation("TUNNEL");
      } else {
        throw Error(res.message || "Authentication failed");
      }
    } catch (err) {
      console.error(err);
    }
  }

  const value = { location };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
