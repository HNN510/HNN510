import { Button, Modal, Select, Space, message } from "antd";
import Typography from "antd/es/typography/Typography";
import React, { useState } from "react";
import "./style.scss";
import SampleApi from "../../../apis/sample";

const ModalReAnalysis = (props) => {
  const { isOpen, detailSample, setIsOpen } = props;
  const [analsMode, setAnalsMode] = useState("auto");
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (value) => {
    setAnalsMode(value);
  };
  const handleAnals = async () => {
    const dataAnalysis = {
      hash_file: detailSample.hash,
      mode_run: [analsMode],
    };
    setIsLoading(true);
    try {
      const res = await SampleApi.analysSample(dataAnalysis);
      if (res.status === 200) {
        message.success("Phân tích thành công");
        setIsOpen(false);
      } else message.error("Phân tích thất bại");
      setIsLoading(false);
    } catch (error) {
      message.error("Phân tích thất bại");
      setIsLoading(false);
    }
  };
  return (
    <Modal
      footer={false}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      className="modaldetected"
    >      
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography>Kiểu phân tích</Typography>
        <Select
          defaultValue="auto"
          style={{ width: 200, marginLeft: "20px" }}
          onChange={handleChange}
        >
          {detailSample.run_mode?.map((item) => (
            <Select.Option value={item}>{item}</Select.Option>
          ))}
        </Select>
      </div>

      <Space style={{ display: "flex", justifyContent: "end" }}>
        <Button size="small" onClick={() => setIsOpen(false)}>
          Hủy
        </Button>
        <Button type="primary" size="small" onClick={handleAnals} loading={isLoading}>
          Xác nhận
        </Button>
      </Space>
    </Modal>
  );
};

export default ModalReAnalysis;
