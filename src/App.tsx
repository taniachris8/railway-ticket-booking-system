import "./App.css";
import { Navigation } from "./components/navbar/Navigation";
import { Outlet } from "react-router";
import { Footer } from "./components/footer/Footer";
import { ScrollToTop } from "./router/ScrollToTop";

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
