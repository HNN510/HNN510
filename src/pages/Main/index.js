import React from "react";
import UploadFileDetect from "./component/DectectUpload";
import { Space, Tabs } from "antd";
import MainTable from "./MainTable";
import './style.scss';
function Main() {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "FILE",
      children: (
        <>
          <UploadFileDetect />
        </>
      ),
    },
    {
      key: "2",
      label: "Tab 2",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Tab 3",
      children: "Content of Tab Pane 3",
    },
  ];

  return (
    <div style={{textAlign: "center"}}>
      <Space style={{width: "60%"}} direction="vertical">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} className="tabsMain"/>
        <MainTable />
      </Space>
    </div>
  );
}

export default Main;
