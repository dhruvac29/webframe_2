import React from "react";
import { Card } from "antd";

const DrawStructure = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Card title="Draw Structure" style={{ width: "100%", height: "80vh" }}>
        <iframe
          src="https://pubchem.vercel.app/"
          style={{ width: "100%", height: "100%", border: "none" }}
          title="PubChem Structure Drawing Tool"
          sandbox="allow-scripts allow-same-origin"
        />
      </Card>
    </div>
  );
};

export default DrawStructure;
