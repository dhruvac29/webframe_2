import React, { useState, useEffect } from "react"; // Import useState and useEffect
import {
  Skeleton,
  Card,
  message,
  Upload,
  Button,
  Row,
  Col,
  Statistic,
} from "antd";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import {
  UploadOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";

const ChemicalEcotoxicity = () => {
  const [loading, setLoading] = useState(true);
  const [isRunClicked, setIsRunClicked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleRunClick = () => {
    setIsRunClicked(true);
  };

  const props = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
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
    cursor: "pointer", // Add cursor style to indicate it's clickable
  };

  const centeredStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  };

  const statisticCardStyle = {
    width: 200, // Set the width of the Statistic card here
    margin: "0 auto",
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Skeleton loading={loading} active>
        <Card style={cardStyle}>Chemical Ecotoxicity</Card>
      </Skeleton>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <Button
        type="primary"
        style={{ marginTop: "20px" }}
        onClick={handleRunClick}
      >
        Run
      </Button>
      {isRunClicked && (
        <>
          <h2 style={{ marginTop: "120px" }}>Model Prediction</h2>
          <Row gutter={16} style={centeredStyle}>
            <Col>
              <Card bordered={false} style={statisticCardStyle}>
                <Statistic
                  title="HC50 Value"
                  value={11.28}
                  precision={2}
                  valueStyle={{
                    color: "#3f8600",
                  }}
                  //   prefix={<ArrowUpOutlined />}
                />
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default ChemicalEcotoxicity;
