import React, { useState } from "react";
import { ReactComponent as CirleIcon } from "../../assets/svg/circle.svg";
import { ReactComponent as DllIcon } from "../../assets/svg/dll.svg";
import { ReactComponent as ExeIcon } from "../../assets/svg/exe.svg";
import moment from "moment";
import Typography from "antd/es/typography/Typography";
import { Button, Divider, Row, Space, Col, Spin } from "antd";
import "./style.scss";
import VirustotalGrap from "./VirutotalGrap";
import { useLocation } from "react-router-dom";
import ModalReAnalysis from "./ModalReAnalysis";
const DetailFile = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { state } = location;
  const renderCircle = (score, status) => {
    let color = "";
    if (status === "done") {
      if (score >= 0 && score <= 50) {
        color = "#39ac4c";
      } else if (score > 50 && score <= 80) {
        color = "orange";
      } else {
        color = "#FF0000";
      }
    } else {
      color = "#d9d9d9";
    }

    return (
      <div className="circleScore">
        <CirleIcon color={color} />
        {status === "done" ? (
          <Typography
            style={{ fontSize: "1.5rem", fontWeight: "bold", color: color }}
            className="circleScoreNumber"
          >
            {score.toFixed(0) < 10 ? (
              <div style={{ marginLeft: "8px" }}>{score.toFixed(0)}</div>
            ) : (
              score.toFixed(0)
            )}
          </Typography>
        ) : (
          <Spin></Spin>
        )}
      </div>
    );
  };
  const handleReAnalysis = () => {
    setIsOpen(true);
  }
  return (
    <div style={{ padding: "15px 100px" }}>
      <div
        className="headerDetail"
        style={{ width: "100%", display: "flex", alignItems: "center" }}
      >
        <div className="headerDetail-Score" style={{ marginRight: "30px" }}>
          {renderCircle(
            state.detailSample.result.score,
            state.detailSample.status
          )}
          {state.detailSample.status === "not analysis" ? (
            <Button>Phân tích</Button>
          ) : (
            <>
              <Button onClick={handleReAnalysis}>Phân tích lại</Button>
              <ModalReAnalysis
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                detailSample={state.detailSample}
              />
            </>
          )}
        </div>
        <div
          className="headerDetail-inf"
          style={{ display: "flex", justifyContent: "space-between", flex: 1 }}
        >
          <div>
            <Typography>{state.detailSample.hash}</Typography>
            <Typography>{state.detailSample.file_name}</Typography>
          </div>
          <div style={{ display: "flex" }} className="headerDetail-inf_wrap">
            <div className="headerDetail-inf_item">
              <Typography>Kích thước</Typography>
              <Typography>{state.detailSample.size}</Typography>
            </div>
            <Divider type="vertical" />
            <div className="headerDetail-inf_item">
              <Typography>Thời gian</Typography>
              <Typography>
                {moment(state.detailSample.time_edit).format("DD/MM/YYYY")}
              </Typography>
            </div>
            <Divider type="vertical" />
            {state.detailSample.filetype === "DLL" ? (
              <DllIcon fontSize={50} />
            ) : (
              <ExeIcon fontSize={50} />
            )}
          </div>
        </div>
      </div>
      <Space className="commonInf_wrapper" direction="vertical">
        <Row className="commonInf-row" style={{ width: "100%" }}>
          <Col span={12} className="commonInfRow-col">
            <Col span={6}>Hash</Col>
            <Col span={18}>{state.detailSample.hash}</Col>
          </Col>
          <Col span={12} className="commonInfRow-col">
            <Col span={6}>Time edit</Col>
            <Col span={18}>
              {moment(state.detailSample.time_edit).format(
                "HH:mm:ss DD/MM/YYYY"
              )}
            </Col>
          </Col>
        </Row>
        <Row>
          <Col span={12} className="commonInfRow-col">
            <Col span={6}>File name</Col>
            <Col span={18}>{state.detailSample.file_name}</Col>
          </Col>
          <Col span={12} className="commonInfRow-col">
            <Col span={6}>Architecture</Col>
            <Col span={18}>{state.detailSample.architecture}</Col>
          </Col>
        </Row>
        <Row>
          <Col span={12} className="commonInfRow-col">
            <Col span={6}>Endianness</Col>
            <Col span={18}>
              {state.detailSample.endianness === "LE"
                ? "Little Endian"
                : "Big Endian"}
            </Col>
          </Col>
          <Col span={12} className="commonInfRow-col">
            <Col span={6}>mode</Col>
            <Col span={18}>{state.detailSample.mode}</Col>
          </Col>
        </Row>
        <Row>
          <Col span={12} className="commonInfRow-col">
            <Col span={6}>Operation system</Col>
            <Col span={18}>{state.detailSample.operation_system}</Col>
          </Col>
          <Col span={12} className="commonInfRow-col">
            <Col span={6}>size</Col>
            <Col span={18}>{state.detailSample.size}</Col>
          </Col>
        </Row>
        <Row>
          <Col span={12} className="commonInfRow-col">
            <Col span={6}>Type</Col>
            <Col span={18}>{state.detailSample.type}</Col>
          </Col>
          <Col span={12} className="commonInfRow-col">
            <Col span={6}>Entropy score</Col>
            <Col span={18}>{state.detailSample.entropy_score}</Col>
          </Col>
        </Row>
        <Row>
          <Col span={12} className="commonInfRow-col">
            <Col span={6}>Is packed</Col>
            <Col span={18}>
              {state.detailSample.is_packed ? "Đã pack" : "Chưa pack"}
            </Col>
          </Col>
          <Col span={12} className="commonInfRow-col">
            <Col span={6}>File type</Col>
            <Col span={18}>{state.detailSample.filetype}</Col>
          </Col>
        </Row>
      </Space>
      <VirustotalGrap data={state.detailSample} />
    </div>
  );
};

export default DetailFile;
