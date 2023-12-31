import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import Catalog from "../../features/catalog/Catalog";
import ContactPage from "../../features/contact/ContactPage";
import AboutPage from "../../features/about/AboutPage";
import ProductDetailsPage from "../../features/catalog/ProductDetails";
import ServerError from "../errors/ServerError";
import NotFoundError from "../errors/NotFoundError";
import Basket from "../../features/basket/Basket";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "catalog", element: <Catalog /> },
      { path: "catalog/:id", element: <ProductDetailsPage /> },
      { path: "server-error", element: <ServerError /> },
      { path: "not-found", element: <NotFoundError /> },
      { path: "basket", element: <Basket /> },
      { path: "*", element: <Navigate to="/not-found" /> },
    ],
  },
]);
