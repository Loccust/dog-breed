import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import PrivateRoute from "./PrivateRoute";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import List from "./pages/DogList";

export default function Router() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route
            index
            element={
              <PrivateRoute>
                <List />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}