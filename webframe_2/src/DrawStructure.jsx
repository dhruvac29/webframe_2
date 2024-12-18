import React from "react";
import { Card } from "antd";
import './DrawStructure.css';

const DrawStructure = () => {
  return (
    <div className="draw-structure-container">
      <Card title="Draw Structure" className="structure-card">
        <iframe
          src="https://pubchem.vercel.app/"
          className="structure-iframe"
          title="PubChem Structure Drawing Tool"
          sandbox="allow-scripts allow-same-origin"
        />
      </Card>
    </div>
  );
};

export default DrawStructure;
