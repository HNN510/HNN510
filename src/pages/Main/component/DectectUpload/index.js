import { Button, Upload, Space, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { ReactComponent as UploadIcon } from "../../../../assets/svg/uploadIcon.svg";
import SampleApi from "../../../../apis/sample";
import ModalDetected from "./ModalDetected";

const UploadFileDetect = ({refetch}) => {
  const [fileList, setFileList] = useState([]);
  const [dataDetected, setDataDetected] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (info) => {
    let fileList = [...info.fileList];

    // Chỉ lưu tệp mới nhất vào fileList
    fileList = fileList.slice(-1);

    // Cập nhật fileList
    setFileList(fileList);
  };
  
  const handleUpload = async () => {
    console.log(fileList[0].originFileObj);
    const fileUpload = fileList[0].originFileObj;
    const formData = new FormData();
    formData.append("file", fileUpload);
    setIsLoading(true);
    try {
      const res = await SampleApi.uploadSample(formData);
      if (res.status === 200) {
        setDataDetected(res.data);
        setIsOpen(true);
        setIsLoading(false);
      }
      // setIsOpen(true)
      // setIsLoading(false)
    } catch (error) {
      setIsLoading(false);
      message.error("Phân tích file lỗi");
    }
  };
  return (
    <Space
      direction="vertical"
      style={{ textAlign: "center", display: "flex" }}
    >
      <Space direction="vertical">
        <UploadIcon />
        <Upload
          fileList={fileList}
          onChange={handleChange}
          beforeUpload={() => false}
          showUploadList={true}
        >
          {fileList.length > 0 ? (
            <></>
          ) : (
            <Button icon={<UploadOutlined />}>Choose File</Button>
          )}
        </Upload>
      </Space>

      {fileList.length > 0 && (
        <Button type="primary" onClick={handleUpload} loading={isLoading}>
          Submit
        </Button>
      )}
      <ModalDetected
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        dataDetected={dataDetected}
        refetch={refetch}
      />
    </Space>
  );
}

export default UploadFileDetect;
