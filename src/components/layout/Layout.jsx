import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { products } from "../../Data";

const Layout = ({ children }) => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Navbar />
      <main className="flex-grow-1" style={{ padding: "80px 0" }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
