import "./App.css";
import { Navigation } from "./components/Navigation";
import { Outlet } from "react-router";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <main className="main-container">
        <Navigation />
        <Outlet />
        <Footer />
      </main>
    </>
  );
}

export default App;
