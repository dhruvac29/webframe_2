import React, { useState, useEffect } from "react";
import { Skeleton, Card, message, Upload, Button } from "antd";
import { UploadOutlined, ArrowDownOutlined } from "@ant-design/icons";
import axios from "axios";

const ChemicalEcotoxicity = () => {
  const [loading, setLoading] = useState(true);
  const [isRunClicked, setIsRunClicked] = useState(false);
  const [csvUrl, setCsvUrl] = useState("");

  const [fileList, setFileList] = useState([]);
  const [binaryData, setBinaryData] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleRunClick = async () => {
    try {
      const response = await axios.get(
        "https://f4etbkx7i0.execute-api.us-east-1.amazonaws.com/uploads"
      );

      if (response.status === 200) {
        const { uploadURL, Key } = response.data;

        const response2 = await axios.put(uploadURL, binaryData, {
          headers: {
            "Content-Type": "text/csv",
          },
        });
        if (response2.status === 200) {
          try {
            const response = await axios.post(
              "https://inewqvb5i7.execute-api.us-east-1.amazonaws.com/default/HC50",
              { fileName: Key }
            );

            if (response.status === 200) {
              console.log(response.data);
            }
          } catch (error) {
            console.error("Error calling Lambda function: ", error);
          }
        }
      } else {
        // onError(new Error("Failed to get pre-signed URL."));
        message.error("Failed to get pre-signed URL.");
      }
    } catch (err) {
      console.error("Error uploading file: ", err);
      message.error("Error uploading file.");
    }
  };

  const handleFileChange = async (info) => {
    console.log(info);
  };

  const onRemove = (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  };

  const beforeUpload = (file) => {
    setFileList([...fileList, file]);
    if (file) {
      readFile(file);
    }

    return false;
  };

  const readFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const csvContent = event.target.result;
      convertToBinary(csvContent);
    };
    reader.readAsText(file);
  };

  const convertToBinary = (csvContent) => {
    const binary = new Blob([csvContent], { type: "text/csv" });
    const reader = new FileReader();
    reader.onloadend = () => {
      const arrayBuffer = reader.result;
      setBinaryData(arrayBuffer);
    };
    reader.readAsArrayBuffer(binary);
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      console.log(file.file);
      // Get a pre-signed URL from your backend
      const response = await axios.get(
        "https://f4etbkx7i0.execute-api.us-east-1.amazonaws.com/uploads"
      );

      if (response.status === 200) {
        const { uploadURL, Key } = response.data;

        // Create FormData to upload the file to S3
        let binary = atob(this.csv.split(",")[1]);
        let array = [];
        for (var i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        let blobData = new Blob([new Uint8Array(array)], { type: "text/csv" });

        console.log("Uploading to: ", uploadURL);

        const result = await fetch(uploadURL, {
          method: "PUT",
          body: blobData,
        });

        if (result.ok) {
          console.log("File uploaded successfully.");
        } else {
          console.error("Error uploading file:", result.statusText);
        }
      } else {
        onError(new Error("Failed to get pre-signed URL."));
        message.error("Failed to get pre-signed URL.");
      }
    } catch (err) {
      console.error("Error uploading file: ", err);
      onError(err);
      message.error("Error uploading file.");
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

  const centeredStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Skeleton loading={loading} active>
        <Card style={cardStyle}>Chemical Ecotoxicity</Card>
      </Skeleton>
      <Upload
        onRemove={onRemove}
        beforeUpload={beforeUpload}
        fileList={fileList}
      >
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
        <div style={centeredStyle}>
          <a href={csvUrl} download="hc50_value.csv">
            <Button icon={<ArrowDownOutlined />} style={{ marginTop: "20px" }}>
              Download CSV
            </Button>
          </a>
        </div>
      )}
    </div>
  );
};

export default ChemicalEcotoxicity;
