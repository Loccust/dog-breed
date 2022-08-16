import { useEffect } from "react";
import Router from "./Routes";
import jwt_decode from "jwt-decode";

export default function App() {
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      const decoded: any = jwt_decode(token);
      const exp = new Date(decoded.exp * 1000)
      if (exp < new Date()) {
        localStorage.removeItem("token");
      }
    }
  } , [token]);
  return <Router />;
}
