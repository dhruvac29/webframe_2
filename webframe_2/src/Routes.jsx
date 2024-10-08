import React from "react";
import { Routes, Route } from "react-router-dom";
import Intro from "./Intro";
import Model from "./Model";
import Contact from "./Contact";
import ChemicalEcotoxicity from "./ChemicalEcotoxicity"; // Import the ChemicalEcotoxicity component
import CalculateHC50 from "./calculateHC50"; // Import the CalculateHC50Page component
import DrawStructure from "./DrawStructure"; // Import the DrawStructurePage component

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Intro title="Title" />} />
      <Route path="/model" element={<ChemicalEcotoxicity title="Title" />} />
      <Route path="/contact" element={<Contact title="Title" />} />
      {/* <Route
        path="/chemical-ecotoxicity"
        element={<ChemicalEcotoxicity title="Chemical Ecotoxicity" />}
      /> */}
      <Route
        path="/chemical-ecotoxicity/calculate-hc50"
        element={<CalculateHC50 />}
      />
      <Route
        path="/chemical-ecotoxicity/draw-structure"
        element={<DrawStructure />}
      />
    </Routes>
  );
};

export default AppRoutes;
