import React from "react";
import './ChemicalEcotoxicity.css';
import { Card, Select } from "antd";
import { useNavigate } from "react-router-dom";
import "./App.css"; // Import the CSS file

const { Option } = Select;

const ChemicalEcotoxicity = () => {
  const navigate = useNavigate();

  const handleOptionChange = (value) => {
    if (value === "calculateHC50") {
      navigate("/chemical-ecotoxicity/calculate-hc50");
    } else if (value === "drawStructure") {
      window.location.href = "https://pubchem.vercel.app/";
    }
  };

  return (
    <div className="chemical-ecotoxicity-container">
      <Card className="chemical-ecotoxicity-card">Chemical Ecotoxicity</Card>
      <Select
        defaultValue=""
        className="chemical-ecotoxicity-select"
        onChange={handleOptionChange}
      >
        <Option value="">Select an option</Option>
        <Option value="calculateHC50">Calculate HC50</Option>
        <Option value="drawStructure">Draw Structure</Option>
      </Select>
    </div>
  );
};

export default ChemicalEcotoxicity;
