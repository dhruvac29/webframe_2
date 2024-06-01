import React, { useState, useEffect } from "react";
import { Skeleton, Card } from "antd";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Model = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Skeleton loading={loading} active>
        {/* Wrap the Card with Link component */}
        <Link to="/chemical-ecotoxicity">
          <Card
            style={{
              width: 400,
              height: 250,
              margin: "150px auto",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f0f2f5",
              border: "1px solid #d9d9d9",
              cursor: "pointer", // Add cursor style to indicate it's clickable
            }}
          >
            Chemical Ecotoxicity
          </Card>
        </Link>
      </Skeleton>
    </div>
  );
};

export default Model;
