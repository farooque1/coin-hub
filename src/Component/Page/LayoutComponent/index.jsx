import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../HeaderComponent";
import Footer from "../FooterComponent";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
