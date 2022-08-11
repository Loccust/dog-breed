import { UserContext } from "./contexts/UserContext";
import { Navigate } from "react-router-dom";
import { useContext } from "react";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(UserContext);
  console.log(auth.user);
  if (!auth.user) {
    // Redirect them to the /register page
    return <Navigate to="/register" />;
  }
  return children;
};
export default PrivateRoute;
