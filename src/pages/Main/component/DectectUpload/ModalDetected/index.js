import { Button, Modal, Select, Space } from "antd";
import Typography from "antd/es/typography/Typography";
import React, { useState } from "react";
import './style.scss'

const ModalDetected = (props) => {
  const { isOpen, dataDetected, setIsOpen } = props;
  const [analsMode, setAnalsMode] = useState("auto");
  const handleChange = (value) => {
    setAnalsMode(value);
  };
  const handleAnals = () => {
    
  }
  return (
    <Modal footer={false} open={isOpen} onCancel={() => setIsOpen(false)} className="modaldetected">
      <Typography>{dataDetected.hash}</Typography>
      <Typography>Nền tảng: {dataDetected.mode}</Typography>
      <Typography>Loại: {dataDetected.type}</Typography>
      <Typography>Entropy: {dataDetected.entropy_score}</Typography>
      <Typography>
        Packer: {dataDetected.is_packed ? "Đã pack" : "Chưa pack"}
      </Typography>
      <div style={{display: "flex", alignItems: "center"}}>
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

      <Space style={{display: "flex", justifyContent: "end"}}>
        <Button size="small" onClick={() => setIsOpen(false)}>Hủy</Button>
        <Button type="primary" size="small" onClick={handleAnals}>Phân tích</Button>
      </Space>
    </Modal>
  );
};

export default ModalDetected;
