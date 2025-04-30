import React from "react";
import { Route, Routes } from "react-router";
import Home from "./Home";
import Footer from "../components/Footer";

const U = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
};

export default U;
