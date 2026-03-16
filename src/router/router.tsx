import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import { NotFoundPage } from "../pages/not-found-page/NotFoundPage";
import { HomePage } from "../pages/home-page/HomePage";
import { TicketsPage } from "../pages/tickets-page/TicketsPage";
import { SeatsPage } from "../pages/seats-page/SeatsPage";

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
      {
        path: "/seats",
        element: <SeatsPage />,
      },
    ],
  },
]);
