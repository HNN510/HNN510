import { Col, Modal, Row } from "antd";
import React from "react";
import "./style.scss";
const RuleModal = ({ isOpen, setIsOpen, rule }) => {
  const dataRule = Object.entries(rule).map(([key, value]) => ({ key, value }))
  const renderTale = () => (
    <>
      {dataRule.map((row) => (
        <Row className="commonInfRow-col">
          <Col span={6}>{row.key}</Col>
          <Col span={18}>{row.value}</Col>
        </Row>
      ))}
    </>
  );
  return (
    <Modal
      footer={false}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      className="ruleModal"
      title="Thông tin chi tiết luật"
    >
      {renderTale()}
    </Modal>
  );
};

export default RuleModal;
