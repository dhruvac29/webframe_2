import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { BrowserRouter as Router, Link } from "react-router-dom";
import AppRoutes from "./Routes";

const { Header, Content, Footer } = Layout;

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
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="demo-logo" />
            <h1 style={{ color: "#fff", margin: 0, marginLeft: 10 }}>Title</h1>
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={items}
            style={{
              minWidth: 0,
            }}
          />
        </Header>
        <Content
          style={{
            padding: "0 48px",
            minHeight: "100%",
          }}
        >
          <AppRoutes />
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Copyright ©{new Date().getFullYear()} 
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
