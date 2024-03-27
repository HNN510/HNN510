import { Col, Modal, Row } from "antd";
import React from "react";
import "./style.scss";
const VirustotalModal = ({ isOpen, setIsOpen, virustotal }) => {
  let data2 = [];
  if (Object.keys(virustotal).length) {
    data2 = Object.entries(virustotal.details).reduce(
      (acc, [key, value], index) => {
        if (index % 2 === 0) {
          acc.push([
            { label: key, value: value },
            { label: "", value: "" },
          ]);
        } else {
          acc[acc.length - 1][1] = { label: key, value: value };
        }
        return acc;
      },
      []
    );
  }
  const renderTale = () => (
    <>
      {data2?.map((row) => (
        <Row>
          {row.map((col) => (
            <Col span={12} className="commonInfRow-col">
              <Col span={8}>{col.label}</Col>
              <Col span={16}>{col.value}</Col>
            </Col>
          ))}
        </Row>
      ))}
    </>
  );
  return (
    <Modal
      footer={false}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      className="virustotalModal"
      title="Thông tin chi tiết virustotal"
    >
      {renderTale()}
    </Modal>
  );
};

export default VirustotalModal;
