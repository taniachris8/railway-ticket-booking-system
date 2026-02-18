import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { NotFoundPage } from "./pages/NotFoundPage";
import { HomePage } from "./pages/HomePage";
import { AboutUs } from "./components/AboutUs";
import { HowItWorks } from "./components/HowItWorks";
import { Feedback } from "./components/Feedback";
import { Contacts } from "./components/Contacts";
import { TicketsPage } from "./pages/TicketsPage";

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
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/how-it-works",
        element: <HowItWorks />,
      },
      {
        path: "/feedback",
        element: <Feedback />,
      },
      {
        path: "/contacts",
        element: <Contacts />,
      },
      {
        path: "/tickets",
        element: <TicketsPage />,
      },
    ],
  },
]);
