import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import { Menu } from "./pages/Menu/Menu";
import { Cart } from "./pages/Cart/Cart";
import { ErrorNotFound } from "./pages/Error/ErrorNotFound";
import { Layout } from "./layout/Layout/Layout";
import { Product } from "./pages/Product/Product";
import { Login } from "./pages/Login/Login";
import { Favorite } from "./pages/Favorite/Favorite";
import { Movie } from "./pages/Movie/Movie";
import axios from "axios";
import { PREFIX } from "./helpers/API";
import { AuthLayout } from "./layout/Auth/AuthLayout";
import { Register } from "./pages/Register/Register";
import { RequireAuth } from "./helpers/RequireAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        path: "/",
        element: <Menu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/favorites",
        element: <Favorite />,
      },
      {
        path: "/product/:id",
        element: <Product />,
        errorElement: <>Ошибка</>,
        loader: async ({ params }) => {
          return {
            // Вытаскиваем res.data, чтобы в компонент пришли чистые данные товара
            data: axios
              .get(`${PREFIX}/products/${params.id}`)
              .then((res) => res.data),
          };
        },
      },
      {
        path: "/movie/:id",
        element: <Movie />,
        errorElement: <>Ничего не найдено</>,
        loader: async ({ params }) => {
          return {
            // Вытаскиваем res.data, чтобы в компонент пришли чистые данные товара
            data: axios
              .get(`${PREFIX}/products/${params.id}`)
              .then((res) => res.data),
          };
        },
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorNotFound />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
