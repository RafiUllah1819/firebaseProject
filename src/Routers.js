import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthSignup } from "./Auth/AuthSignup";
import { AuthSignIn } from "./Auth/AuthSignIn";
import { Home } from "./Components/Home";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { SingleRecord } from "./Components/SingleRecord";
import { Checkout } from "./Components/Checkout";

export const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AuthSignup />}></Route>
        <Route path="/" element={<AuthSignIn />}></Route>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/singleRecord/:id" element={<SingleRecord />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
        </Route>
      </Routes>
    </div>
  );
};
