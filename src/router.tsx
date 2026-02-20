import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { NotFoundPage } from "./pages/NotFoundPage";
import { HomePage } from "./pages/HomePage";
import { TicketsPage } from "./pages/tickets-page/TicketsPage";

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/tickets",
        element: <TicketsPage />,
      },
    ],
  },
]);
