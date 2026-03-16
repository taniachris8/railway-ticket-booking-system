import { Outlet } from "react-router";

import { ScrollToTop } from "./router/ScrollToTop";

import { Navigation } from "./components/navbar/Navigation";
import { Footer } from "./components/footer/Footer";

import "./App.css";

function App() {

  return (
    <>
      <main className="main-container">
        <ScrollToTop/>
        <Navigation />
        <Outlet />
        <Footer />
      </main>
    </>
  );
}

export default App;
