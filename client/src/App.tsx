import { AdminPages } from "./components/Admin";
import { LoginPages } from "./components/Login";
import { VisitorPages } from "./components/Visitor";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
  return <RouterProvider router={router} />;
};

export default App;
