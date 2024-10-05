import React, { useState, useEffect } from "react";
import { Skeleton, Card } from "antd";
import { Link } from "react-router-dom";
import "./Model.css"; // Import the CSS file

const Model = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="model-container">
      <Skeleton loading={loading} active className="skeleton-active">
        <Link to="/chemical-ecotoxicity">
          <Card className="model-card">Chemical Ecotoxicity</Card>
        </Link>
      </Skeleton>
    </div>
  );
};

export default Model;
