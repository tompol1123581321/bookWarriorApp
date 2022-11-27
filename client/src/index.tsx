import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <b>Page not found</b>,
  },
  {
    path: "/",
    element: <App />,
    errorElement: <b>Page not found</b>,
  },
  {
    path: "/",
    element: <App />,
    errorElement: <b>Page not found</b>,
  },
]);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
