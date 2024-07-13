# Tutorial to Understand the Main Functionality of the Chemical Ecotoxicity Web Application

This tutorial provides a detailed explanation of the main functionalities of each component in the Chemical Ecotoxicity web application. It also includes instructions on how to modify the components to suit specific requirements.

## Component 1: ChemicalEcotoxicity.jsx

This component serves as the model page where users can choose between calculating HC50 values or drawing chemical structures.

### Code Breakdown:

```JSX
// Import necessary modules from React and Ant Design
import React from "react";
import { Card, Select } from "antd";
import { useNavigate } from "react-router-dom";

// Extract Option from Select component for easier use
const { Option } = Select;

// Define the ChemicalEcotoxicity functional component
const ChemicalEcotoxicity = () => {
  // useNavigate hook from react-router-dom for navigation
  const navigate = useNavigate();

  // Function to handle option change in Select component
  const handleOptionChange = (value) => {
    // If "Calculate HC50" is selected, navigate to the corresponding route
    if (value === "calculateHC50") {
      navigate("/chemical-ecotoxicity/calculate-hc50");
    } 
    // If "Draw Structure" is selected, navigate to the external URL
    else if (value === "drawStructure") {
      window.location.href = "https://pubchem.vercel.app/";
    }
  };

  // Styles for the Card component
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
      {/\* Card component displaying the title \*/}
      <Card style={cardStyle}>Chemical Ecotoxicity</Card>
      {/\* Select component for choosing an option \*/}
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

// Export the component as default
export default ChemicalEcotoxicity;
```

**Explanation:**

1.  **Imports**: Importing necessary modules from React and Ant Design.
2.  **useNavigate**: Hook from `react-router-dom` used for navigation.
3.  **handleOptionChange**: Function to handle the option selection and navigate accordingly.
4.  **Card and Select**: UI elements for displaying options.

**Customization:**

*   **Change Options**: Modify the `<Select>` component and `handleOptionChange` function to add or change options.
*   **Style Customization**: Change the styles of the Card and Select components by modifying the `cardStyle` and inline styles.

## Component 2: calculateHC50.jsx

This component handles file upload, calls backend services to calculate HC50 values, and displays the results.

### Code Breakdown:

```JSX
// Import necessary modules from React, Ant Design, and other libraries
import React, { useState, useEffect } from "react";
import { Skeleton, Card, message, Upload, Button, Table } from "antd";
import { UploadOutlined, ArrowDownOutlined } from "@ant-design/icons";
import axios from "axios";

// Define the calculateHC50 functional component
const calculateHC50 = () => {
  // State variables to manage component state
  const \[loading, setLoading\] = useState(true);
  const \[isRunClicked, setIsRunClicked\] = useState(false);
  const \[csvUrl, setCsvUrl\] = useState("");
  const \[fileList, setFileList\] = useState(\[\]);
  const \[binaryData, setBinaryData\] = useState(null);
  const \[predictions, setPredictions\] = useState(\[\]);

  // useEffect to simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, \[\]);

  // Function to handle the Run button click
  const handleRunClick = async () => {
    try {
      // Request pre-signed URL from backend
      const response = await axios.get(
        "https://cyx18z5nv0.execute-api.us-east-1.amazonaws.com/presigned"
      );

      if (response.status === 200) {
        const { url, key } = response.data;

        // Upload the binary data to S3
        const response2 = await axios.put(url, binaryData, {
          headers: {
            "Content-Type": "text/csv",
          },
        });
        if (response2.status === 200) {
          try {
            // Invoke Lambda function to process the file
            const lambdaResponse = await axios.post(
              "https://22ctltstdh.execute-api.us-east-1.amazonaws.com/prod/analyze",
              { fileName: key }
            );

            if (lambdaResponse.status === 200) {
              const responseData = lambdaResponse.data;
              if (Array.isArray(responseData)) {
                setPredictions(responseData);
                generateCSV(responseData);
                setIsRunClicked(true);
                setFileList(\[\]); // Clear the fileList after processing
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

  // Handle file changes (not used in this example)
  const handleFileChange = async (info) => {
    console.log(info);
  };

  // Handle file removal
  const onRemove = (file) => {
    setFileList(\[\]);
  };

  // Before upload handler to read the file
  const beforeUpload = (file) => {
    setFileList(\[file\]);
    if (file) {
      readFile(file);
    }

    return false;
  };

  // Read the file and convert it to binary data
  const readFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const csvContent = event.target.result;
      convertToBinary(csvContent);
    };
    reader.readAsText(file);
  };

  // Convert CSV content to binary data
  const convertToBinary = (csvContent) => {
    const binary = new Blob(\[csvContent\], { type: "text/csv" });
    const reader = new FileReader();
    reader.onloadend = () => {
      const arrayBuffer = reader.result;
      setBinaryData(arrayBuffer);
    };
    reader.readAsArrayBuffer(binary);
  };

  // Generate CSV file from predictions
  const generateCSV = (data) => {
    if (!Array.isArray(data)) {
      console.error("Expected array but got:", data);
      return;
    }

    const csvHeader = "Index,HC50 Value\\n";
    const csvRows = data
      .map((value, index) => \`${index + 1},${value}\\n\`)
      .join("");
    const csvContent = csvHeader + csvRows;
    const blob = new Blob(\[csvContent\], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    setCsvUrl(url);
  };

  // Table columns configuration
  const columns = \[
    {
      title: "Index",
      dataIndex: "serialNumber",
      key: "serialNumber",
      width: 80,
      align: "center",
    },
    {
      title: "HC50 Value",
      dataIndex: "value",
      key: "value",
      width: 80,
      align: "center",
    },
  \];

  // Data source for the table
  const dataSource = predictions.map((value, index) => ({
    key: index,
    serialNumber: index + 1,
    value,
  }));

  // Styles for the Card component
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

  // Styles for the centered content
  const centeredStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  };

  // Styles for the download button
  const downloadButtonStyle = {
    fontWeight: "bold",
    color: "#1890ff",
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
      {isRunClicked && csvUrl && (
        <div style={centeredStyle}>
          <a href={csvUrl} download="hc50\_value.csv">
            <Button
              icon={<ArrowDownOutlined />}
              style={{ marginTop: "20px", ...downloadButtonStyle }}
            >
              Download CSV
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

// Export the component as default
export default calculateHC50;
```

**Explanation:**

1.  **State Variables**: Manage component state using useState.
2.  **useEffect**: Simulate loading state.
3.  **handleRunClick**: Handle the Run button click, upload file to S3, call Lambda function, and process the results.
4.  **File Handlers**: Handle file upload, read file content, and convert it to binary.
5.  **generateCSV**: Generate and download CSV file from predictions.
6.  **Table**: Display the predictions in a table.

**Customization:**

*   **Change API Endpoints**: Modify the URLs in the `handleRunClick` function to use different API endpoints.
*   **Adjust File Processing**: Modify the `readFile`, `convertToBinary`, and `generateCSV` functions if your file processing logic differs.
*   **Customize Table and Buttons**: Change the table columns or the button styles to fit your requirements.

## Component 3: DrawStructure.jsx

This component embeds a tool for drawing chemical structures using an iframe.

### Code Breakdown:

```JSX
// Import necessary modules from React and Ant Design
import React from "react";
import { Card } from "antd";

// Define the DrawStructure functional component
const DrawStructure = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {/\* Card component displaying the title and embedding the iframe \*/}
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

// Export the component as default
export default DrawStructure;
```

**Explanation:**

1.  **Card and iframe**: Display the structure drawing tool using an embedded iframe.

**Customization:**

*   **Change Embedded Tool URL**: Modify the `src` attribute of the `iframe` to use a different drawing tool.
*   **Adjust Card Styles**: Change the styles of the Card component to better fit your layout.

## Summary

### ChemicalEcotoxicity.jsx:

1.  **useNavigate**: Hook for navigation.
2.  **handleOptionChange**: Function to handle option selection and navigate accordingly.

### calculateHC50.jsx:

1.  **State Variables**: Manage component state using useState.
2.  **useEffect**: Simulate loading state.
3.  **handleRunClick**: Handle the Run button click, upload file to S3, call Lambda function, and process the results.
4.  **File Handlers**: Handle file upload, read file content, and convert it to binary.
5.  **generateCSV**: Generate and download CSV file from predictions.
6.  **Table**: Display the predictions in a table.

### DrawStructure.jsx:

1.  **Card and iframe**: Display the structure drawing tool using an embedded iframe.

By following this detailed breakdown, you will have a clear understanding of how each component works and contributes to the overall functionality of the Chemical Ecotoxicity web application. The customization sections guide you on how to modify each component to fit specific needs.

Enjoy!!!!
