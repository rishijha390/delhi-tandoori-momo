import React from "react";
import "./App.css";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "./components/ui/sonner";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import MenuIntegrated from "./components/MenuIntegrated";
import ReviewsIntegrated from "./components/ReviewsIntegrated";
import Gallery from "./components/Gallery";
import Location from "./components/Location";
import ContactIntegrated from "./components/ContactIntegrated";
import Footer from "./components/Footer";
import CartIntegrated from "./components/CartIntegrated";

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Header />
        <Hero />
        <About />
        <MenuIntegrated />
        <ReviewsIntegrated />
        <Gallery />
        <Location />
        <ContactIntegrated />
        <Footer />
        <CartIntegrated />
        <Toaster position="top-right" richColors />
      </div>
    </CartProvider>
  );
}

export default App;
