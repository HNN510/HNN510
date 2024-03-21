import React from "react";
import { Button, Layout, Space } from "antd";
import { Content, Header, Footer } from "antd/es/layout/layout";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const LayoutCustom = ({ children }) => { 
const navigate = useNavigate();
  return (
    <Layout>
      <Header>
        <Space>
            <Button icon={<ArrowLeftOutlined/>} onClick={() => navigate(-1)}/>
        </Space>
      </Header>
      <Content>{children}</Content>
      <Footer style={{ textAlign: "center" }}>
        Detect Malware ©{new Date().getFullYear()} Created by XLTeam
      </Footer>
    </Layout>
  );
};

export default LayoutCustom;
