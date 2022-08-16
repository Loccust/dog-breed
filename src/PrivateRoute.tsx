import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    // Redirect them to the /register page
    return <Navigate to="/register" />;
  }
  return children;
};
export default PrivateRoute;