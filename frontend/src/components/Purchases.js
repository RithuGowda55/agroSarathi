// import 'bootstrap/dist/css/bootstrap.min.css';
import { NavbarComponent } from "./CartContext";
import { Container } from "react-bootstrap";
import React, { useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Cancel from './pages/Cancel';
// import Store from './pages/Store';
// import Success from './pages/Success';
import { CartProvider } from "./CartContext";
import { Success, Store, Cancel } from "./CartContext";
import Back from "./Back";

// localhost:3000 -> Home
// localhost:3000/success -> Success



function Purchases() {
  // Dynamically import Bootstrap styles
  // useEffect(() => {
  //   import("bootstrap/dist/css/bootstrap.min.css");
  // }, []);
  return (
    <>
      <Back title="Subscription Plans" />

      <CartProvider>
        <Container>
          <NavbarComponent></NavbarComponent>
          <Store />
          {/* <BrowserRouter>
            <Routes>
              <Route index element={<Store />} />
              <Route path="success" element={<Success />} />
              <Route path="cancel" element={<Cancel />} />
            </Routes>
          </BrowserRouter> */}
        </Container>
      </CartProvider>
    </>
  );
}

export default Purchases;
