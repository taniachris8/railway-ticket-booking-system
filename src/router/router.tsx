import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import { NotFoundPage } from "../pages/not-found-page/NotFoundPage";
import { HomePage } from "../pages/home-page/HomePage";
import { TicketsPage } from "../pages/tickets-page/TicketsPage";
import { SeatsPage } from "../pages/seats-page/SeatsPage";
import { PassengersPage } from "../pages/passengers-page/PassengersPage";
import { PaymentPage } from "../pages/payment-page/PaymentPage";
import { ConfirmationPage } from "../pages/confirmation-page/ConfirmationPage";
import { SuccessfulOrderPage } from "../pages/successful-order-page/SuccessfulOrderPage";

export const router = createBrowserRouter(
  [
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
        {
          path: "/passengers",
          element: <PassengersPage />,
        },
        {
          path: "/payment",
          element: <PaymentPage />,
        },
        {
          path: "/confirmation",
          element: <ConfirmationPage />,
        },
        {
          path: "/successful-order",
          element: <SuccessfulOrderPage />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);
