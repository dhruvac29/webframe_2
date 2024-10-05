import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { BrowserRouter as Router, Link } from "react-router-dom";
import AppRoutes from "./Routes";
import "./App.css"; // Import the CSS file
import Header from "./Header";

const { Content, Footer } = Layout;

const items = [
  { key: "1", label: <Link to="/">Intro</Link> },
  { key: "2", label: <Link to="/model">Model</Link> },
  { key: "3", label: <Link to="/contact">Contact</Link> },
];

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Router>
      <Layout className="layout-container">
        <Header />
        <Content className="content-container">
          <div className="content-box">
            <AppRoutes />
          </div>
        </Content>
        <Footer className="footer">
          © {new Date().getFullYear()} Ecotoxicity. All rights reserved.
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
