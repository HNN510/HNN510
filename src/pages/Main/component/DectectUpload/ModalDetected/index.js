import { Button, Modal, Select, Space, message } from "antd";
import Typography from "antd/es/typography/Typography";
import React, { useState } from "react";
import "./style.scss";
import SampleApi from "../../../../../apis/sample";

const ModalDetected = (props) => {
  const { isOpen, dataDetected, setIsOpen, refetch } = props;
  const [analsMode, setAnalsMode] = useState("auto");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (value) => {
    setAnalsMode(value);
  };
  const handleAnals = async () => {
    const dataAnalysis = {
      hash_file: dataDetected.hash,
      mode_run: [analsMode],
    };
    setIsLoading(true);
    try {
      const res = await SampleApi.analysSample(dataAnalysis);
      if (res.status === 200) {
        message.success("Phân tích thành công");
        setIsOpen(false);
      } else {
        message.error("Phân tích thất bại");
      }
      setIsLoading(false);
      refetch();
    } catch (error) {
      message.error("Phân tích thất bại");
      setIsLoading(false);
      refetch();
    }
  };
  const handleCancel = () => {
    setIsOpen(false);
    refetch();
  }
  return (
    <Modal
      footer={false}
      open={isOpen}
      onCancel={handleCancel}
      className="modaldetected"
    >
      <Typography>{dataDetected.hash}</Typography>
      <Typography>Nền tảng: {dataDetected.mode}</Typography>
      <Typography>Loại: {dataDetected.type}</Typography>
      <Typography>Entropy: {dataDetected.entropy_score}</Typography>
      <Typography>
        Packer: {dataDetected.is_packed ? "Đã pack" : "Chưa pack"}
      </Typography>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography>Kiểu phân tích</Typography>
        <Select
          defaultValue="auto"
          style={{ width: 200, marginLeft: "20px" }}
          onChange={handleChange}
        >
          {dataDetected.run_mode?.map((item) => (
            <Select.Option value={item}>{item}</Select.Option>
          ))}
        </Select>
      </div>

      <Space style={{ display: "flex", justifyContent: "end" }}>
        <Button size="small" onClick={handleCancel}>
          Hủy
        </Button>
        <Button type="primary" size="small" onClick={handleAnals} loading={isLoading}>
          Phân tích
        </Button>
      </Space>
    </Modal>
  );
};

export default ModalDetected;
