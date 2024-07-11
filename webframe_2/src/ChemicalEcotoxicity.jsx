import React from "react";
import { Card, Select } from "antd";
import { useNavigate } from "react-router-dom";

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

  const cardStyle = {
    width: 300,
    height: 150,
    margin: "50px auto",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f2f5",
    border: "1px solid #d9d9d9",
    cursor: "pointer",
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Card style={cardStyle}>Chemical Ecotoxicity</Card>
      <Select
        defaultValue=""
        style={{ width: 200, marginBottom: 20 }}
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
