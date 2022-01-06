import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Header } from "./Components/Header";

export const ProtectedRoutes = () => {
  const auth = localStorage.getItem("token") ? true : false;

  return auth ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to={{ pathname: "/" }} />
  );
};
