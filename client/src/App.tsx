import { AdminPages } from "./components/Admin";
import { LoginPages } from "./components/Login";
import { VisitorPages } from "./components/Visitor";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Router,
  Routes,
  Route,
} from "react-router-dom";
import { UserContextProvider } from "./userContext";
import { ProtectedRoute } from "./components/common/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPages />,
    errorElement: <b>Page not found</b>,
  },
  {
    path: "/admin",
    element: <AdminPages />,
    errorElement: <b>Page not found</b>,
  },
  {
    path: "/visitor",
    element: <VisitorPages />,
    errorElement: <b>Page not found</b>,
  },
]);

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<LoginPages />} />
        <Route path="/registrace" element={<LoginPages />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute checkedRole="ADMIN" element={<AdminPages />} />
          }
        />
        <Route
          path="/visitor"
          element={
            <ProtectedRoute checkedRole="VISITOR" element={<VisitorPages />} />
          }
        />
      </Routes>
    </UserContextProvider>
  );
};

export default App;
