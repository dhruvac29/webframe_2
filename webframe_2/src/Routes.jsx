import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Intro from './Intro';
import Model from './Model';
import Contact from './Contact';
import ChemicalEcotoxicity from './ChemicalEcotoxicity'; // Import the ChemicalEcotoxicity component

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Intro title="Title" />} />
      <Route path="/model" element={<Model title="Title" />} />
      <Route path="/contact" element={<Contact title="Title" />} />
      <Route path="/chemical-ecotoxicity" element={<ChemicalEcotoxicity title="Chemical Ecotoxicity" />} /> {/* Add the new route */}
    </Routes>
  );
};

export default AppRoutes;
