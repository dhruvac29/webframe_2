import React, { useState, useEffect } from "react";
import { Skeleton, Card } from "antd";

const Intro = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Skeleton loading={loading} active>
        <Card
          style={{
            width: 400,
            height: 250,
            margin: "90px auto",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f0f2f5",
            border: "1px solid #d9d9d9",
          }}
        >
          Placeholder for picture
        </Card>
      </Skeleton>
      <Skeleton loading={loading} active>
        <Card
          style={{
            width: "80%",
            height: 150,
            margin: "60px auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f0f2f5",
            border: "1px solid #d9d9d9",
          }}
        >
          Placeholder for intro text
        </Card>
      </Skeleton>
    </div>
  );
};

export default Intro;
