import React from "react";
import { Route, Routes } from "react-router-dom";
import End from "../pages/End";
import Questions from "../pages/Questions";
import Start from "../pages/Start";

function Routers() {
  return (
    <Routes>
      <Route path="/question" element={<Questions />} />
      <Route path="/end" element={<End />} />
      <Route path="*" element={<Start />} />
    </Routes>
  );
}

export default Routers;
