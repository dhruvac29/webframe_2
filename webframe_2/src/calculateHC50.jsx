// import React, { useState, useEffect } from "react";
// import { Skeleton, Card, message, Upload, Button, Table } from "antd";
// import { UploadOutlined, ArrowDownOutlined } from "@ant-design/icons";
// import axios from "axios";

// const calculateHC50 = () => {
//   const [loading, setLoading] = useState(true);
//   const [isRunClicked, setIsRunClicked] = useState(false);
//   const [csvUrl, setCsvUrl] = useState("");
//   const [fileList, setFileList] = useState([]);
//   const [binaryData, setBinaryData] = useState(null);
//   const [predictions, setPredictions] = useState([]);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleRunClick = async () => {
//     try {
//       const response = await axios.get(
//         "https://cyx18z5nv0.execute-api.us-east-1.amazonaws.com/presigned"
//       );

//       if (response.status === 200) {
//         const { url, key } = response.data;

//         // console.log("Uploading file to S3...", uploadURL, Key);

//         const response2 = await axios.put(url, binaryData, {
//           headers: {
//             "Content-Type": "text/csv",
//           },
//         });
//         if (response2.status === 200) {
//           try {
//             const lambdaResponse = await axios.post(
//               "https://22ctltstdh.execute-api.us-east-1.amazonaws.com/prod/analyze",
//               { fileName: key }
//             );

//             if (lambdaResponse.status === 200) {
//               const responseData = lambdaResponse.data;
//               if (Array.isArray(responseData)) {
//                 setPredictions(responseData);
//                 generateCSV(responseData);
//                 setIsRunClicked(true);
//                 setFileList([]); // Clear the fileList after processing
//               } else {
//                 console.error("Expected an array but got:", responseData);
//                 message.error("Unexpected response format.");
//               }
//             }
//           } catch (error) {
//             console.error("Error calling Lambda function: ", error);
//           }
//         }
//       } else {
//         message.error("Failed to get pre-signed URL.");
//       }
//     } catch (err) {
//       console.error("Error uploading file: ", err);
//       message.error("Error uploading file.");
//     }
//   };

//   const handleFileChange = async (info) => {
//     console.log(info);
//   };

//   const onRemove = (file) => {
//     setFileList([]);
//   };

//   const beforeUpload = (file) => {
//     setFileList([file]);
//     if (file) {
//       readFile(file);
//     }

//     return false;
//   };

//   const readFile = (file) => {
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const csvContent = event.target.result;
//       convertToBinary(csvContent);
//     };
//     reader.readAsText(file);
//   };

//   const convertToBinary = (csvContent) => {
//     const binary = new Blob([csvContent], { type: "text/csv" });
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const arrayBuffer = reader.result;
//       setBinaryData(arrayBuffer);
//     };
//     reader.readAsArrayBuffer(binary);
//   };

//   const generateCSV = (data) => {
//     if (!Array.isArray(data)) {
//       console.error("Expected array but got:", data);
//       return;
//     }

//     const csvHeader = "Index,HC50 Value\n";
//     const csvRows = data
//       .map((value, index) => `${index + 1},${value}\n`)
//       .join("");
//     const csvContent = csvHeader + csvRows;
//     const blob = new Blob([csvContent], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);
//     setCsvUrl(url);
//   };

//   const columns = [
//     {
//       title: "Index",
//       dataIndex: "serialNumber",
//       key: "serialNumber",
//       width: 80,
//       align: "center",
//     },
//     {
//       title: "HC50 Value",
//       dataIndex: "value",
//       key: "value",
//       width: 80,
//       align: "center",
//     },
//   ];

//   const dataSource = predictions.map((value, index) => ({
//     key: index,
//     serialNumber: index + 1,
//     value,
//   }));

//   const handleDownload = async () => {
//     const response = await fetch("/HC50raw_10.csv");
//     const blob = await response.blob();
//     const url = window.URL.createObjectURL(blob);

//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "data.csv";
//     link.click();

//     window.URL.revokeObjectURL(url);
//   };

//   const cardStyle = {
//     width: 300,
//     height: 150,
//     margin: "50px auto",
//     marginBottom: "20px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#f0f2f5",
//     border: "1px solid #d9d9d9",
//     cursor: "pointer",
//   };

//   const centeredStyle = {
//     display: "flex",
//     justifyContent: "center",
//     marginTop: "20px",
//   };

//   const downloadButtonStyle = {
//     fontWeight: "bold",
//     color: "#1890ff",
//   };

//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <Skeleton loading={loading} active>
//         <Card style={cardStyle}>Chemical Ecotoxicity</Card>
//       </Skeleton>
//       <div style={centeredStyle}>
//         {/* <a href="/HC50raw_10.csv" download> */}
//         <Button
//           onClick={handleDownload}
//           icon={<ArrowDownOutlined />}
//           style={{
//             marginTop: "20px",
//             marginBottom: "20px",
//             ...downloadButtonStyle,
//           }}
//         >
//           Download Data File
//         </Button>
//         {/* </a> */}
//       </div>
//       <Upload
//         onRemove={onRemove}
//         beforeUpload={beforeUpload}
//         fileList={fileList}
//       >
//         <Button icon={<UploadOutlined />}>Click to Upload</Button>
//       </Upload>
//       <Button
//         type="primary"
//         style={{ marginTop: "20px" }}
//         onClick={handleRunClick}
//       >
//         Run
//       </Button>
//       {isRunClicked && csvUrl && (
//         <div style={centeredStyle}>
//           <a href={csvUrl} download="hc50_value.csv">
//             <Button
//               icon={<ArrowDownOutlined />}
//               style={{ marginTop: "20px", ...downloadButtonStyle }}
//             >
//               Download CSV
//             </Button>
//           </a>
//         </div>
//       )}
//       {isRunClicked && predictions.length > 0 && (
//         <div style={{ marginTop: "20px" }}>
//           <Table
//             dataSource={dataSource}
//             columns={columns}
//             pagination={false}
//             bordered
//             title={() => (
//               <div style={{ fontWeight: "bold", fontSize: "24px" }}>
//                 Auto Encoder Function Output
//               </div>
//             )}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default calculateHC50;

import React, { useState, useEffect } from "react";
import { Skeleton, Card, message, Upload, Button, Table } from "antd";
import { UploadOutlined, ArrowDownOutlined } from "@ant-design/icons";
import axios from "axios";

const CalculateHC50 = () => {
  const [loading, setLoading] = useState(true);
  const [isRunClicked, setIsRunClicked] = useState(false);
  const [csvUrl, setCsvUrl] = useState("");
  const [fileList, setFileList] = useState([]);
  const [binaryData, setBinaryData] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [casValues, setCasValues] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleRunClick = async () => {
    try {
      const response = await axios.get(
        "https://cyx18z5nv0.execute-api.us-east-1.amazonaws.com/presigned"
      );

      if (response.status === 200) {
        const { url, key } = response.data;

        const response2 = await axios.put(url, binaryData, {
          headers: {
            "Content-Type": "text/csv",
          },
        });
        if (response2.status === 200) {
          try {
            const lambdaResponse = await axios.post(
              "https://22ctltstdh.execute-api.us-east-1.amazonaws.com/prod/analyze",
              { fileName: key }
            );

            if (lambdaResponse.status === 200) {
              const responseData = lambdaResponse.data;
              if (Array.isArray(responseData)) {
                setPredictions(responseData);
                generateModifiedCSV(responseData);
                setIsRunClicked(true);
                setFileList([]);
              } else {
                console.error("Expected an array but got:", responseData);
                message.error("Unexpected response format.");
              }
            }
          } catch (error) {
            console.error("Error calling Lambda function: ", error);
          }
        }
      } else {
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
    setFileList([]);
  };

  const beforeUpload = (file) => {
    setFileList([file]);
    if (file) {
      readFile(file);
    }
    return false;
  };

  const readFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const csvContent = event.target.result;
      const rows = csvContent.split("\n");

      // Skip the header row and extract CAS values
      const casColumn = rows.slice(1).map((row) => row.split(",")[0]);
      setCasValues(casColumn);
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

  const generateModifiedCSV = (predictions) => {
    if (!Array.isArray(predictions) || !Array.isArray(casValues)) {
      console.error("Expected arrays for predictions and CAS values.");
      return;
    }

    const csvHeader = "CAS,HC50 Value\n";
    const csvRows = casValues
      .slice(0, predictions.length)
      .map((cas, index) => `${cas},${predictions[index]}\n`)
      .join("");
    const csvContent = csvHeader + csvRows;
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    setCsvUrl(url);
  };

  const columns = [
    {
      title: "CAS",
      dataIndex: "cas",
      key: "cas",
      width: 100,
      align: "center",
    },
    {
      title: "HC50 Value",
      dataIndex: "value",
      key: "value",
      width: 100,
      align: "center",
    },
  ];

  const dataSource = predictions.map((value, index) => ({
    key: index,
    cas: casValues[index] || "N/A",
    value,
  }));

  const handleDownload = async () => {
    const response = await fetch("/HC50raw_10.csv");
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "data.csv";
    link.click();

    window.URL.revokeObjectURL(url);
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

  const downloadButtonStyle = {
    fontWeight: "bold",
    color: "#1890ff",
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Skeleton loading={loading} active>
        <Card style={cardStyle}>Chemical Ecotoxicity</Card>
      </Skeleton>
      <div style={centeredStyle}>
        <Button
          onClick={handleDownload}
          icon={<ArrowDownOutlined />}
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            ...downloadButtonStyle,
          }}
        >
          Download Data File
        </Button>
      </div>
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
      {isRunClicked && csvUrl && (
        <div style={centeredStyle}>
          <a href={csvUrl} download="modified_hc50_value.csv">
            <Button
              icon={<ArrowDownOutlined />}
              style={{ marginTop: "20px", ...downloadButtonStyle }}
            >
              Download Predicted CSV
            </Button>
          </a>
        </div>
      )}
      {isRunClicked && predictions.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            bordered
            title={() => (
              <div style={{ fontWeight: "bold", fontSize: "24px" }}>
                Auto Encoder Function Output
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default CalculateHC50;
