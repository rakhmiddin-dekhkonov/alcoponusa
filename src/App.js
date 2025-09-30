import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Systems from "./pages/Systems";
import SamplesFinishes from "./pages/SamplesFinishes";
import Gallery from "./pages/Gallery";
import Resources from "./pages/Resources";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import SystemDetail from "./pages/SystemDetail";
import FinishDetail from "./pages/FinishDetail";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import GalleryDetails from "./pages/GalleryDetails";
import Catalog from "./pages/Catalog";
import Chatbot from "./components/Chatbot"; // 👈 add this
import "./styles/App.css";

import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";


export default function App() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/systems" element={<Systems />} />
          <Route path="/samples-finishes" element={<SamplesFinishes />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/system/:slug" element={<SystemDetail />} />
          <Route path="/finishes/:code" element={<FinishDetail />} />
          <Route path="/gallery/:id" element={<GalleryDetails />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot /> {/* 👈 render once so it shows on all pages */}
    </>
  );
}
