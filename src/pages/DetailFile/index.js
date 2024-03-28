import React, { useEffect, useState } from "react";
import { ReactComponent as CirleIcon } from "../../assets/svg/circle.svg";
import { ReactComponent as DllIcon } from "../../assets/svg/dll.svg";
import { ReactComponent as ExeIcon } from "../../assets/svg/exe.svg";
import moment from "moment";
import Typography from "antd/es/typography/Typography";
import { Button, Divider, Row, Space, Col, Spin, message, Modal } from "antd";
import "./style.scss";
import VirustotalGrap from "./VirutotalGrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ModalReAnalysis from "./ModalReAnalysis";
import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import SampleApi from "../../apis/sample";
const DetailFile = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [detailSample, setDetailSample] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [titleAnalysis, setTitleAnalysis] = useState("");
  const { hash } = useParams();
  const navigate = useNavigate();
  const fetchDataSample = async () => {
    setIsLoading(true);
    try {
      const res = await SampleApi.getByHash(hash);
      if (res.status === 200) {
        setDetailSample(res.data);
      } else {
        message.error("Lấy dữ liệu chi tiết sample lỗi");
      }
      setIsLoading(false);
    } catch (error) {
      message.error("Lấy dữ liệu chi tiết sample lỗi");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchDataSample();
  }, []);
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
  const handleReAnalysis = (title) => {
    setTitleAnalysis(title);
    setIsOpen(true);
  };
  const handleDeleteSample = () => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xóa không?",
      onOk: async () => {
        try {
          const res = await SampleApi.deleteSample(detailSample.hash);
          if (res.status === 200) {
            message.success("Xóa thành công");
            navigate("/");
          } else message.error("Xóa thất bại");
        } catch (error) {
          message.error("Xóa thất bại");
        }
      },
    });
  };
  return (
    <>
      {isLoading ? (
        <Spin />
      ) : (
        <div style={{ padding: "15px 100px" }}>
          <div
            className="headerDetail"
            style={{ width: "100%", display: "flex", alignItems: "center" }}
          >
            <div className="headerDetail-Score" style={{ marginRight: "30px" }}>
              {renderCircle(detailSample.result?.score, detailSample.status)}
              {detailSample.status === "not analysis" ? (
                <Button onClick={() => handleReAnalysis("Phân tích")}>
                  Phân tích
                </Button>
              ) : (
                <>
                  <Button onClick={() => handleReAnalysis("Phân tích lại")}>
                    Phân tích lại
                  </Button>
                </>
              )}
              <ModalReAnalysis
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                detailSample={detailSample}
                title={titleAnalysis}
              />
            </div>
            <div
              className="headerDetail-inf"
              style={{
                display: "flex",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <div>
                <Typography>{detailSample.hash}</Typography>
                <Typography>{detailSample.file_name}</Typography>
                <Typography>
                  {detailSample.status !== "not analysis"
                    ? `Lần cuối phân tích: ${detailSample.last_mode_analysis}`
                    : "Chưa phân tích"}
                </Typography>
              </div>
              <div className="headerDetail-inf_wrap">
                <div
                  style={{ display: "flex" }}
                  className="headerDetail-inf_content"
                >
                  <div className="headerDetail-inf_item">
                    <Typography>Kích thước</Typography>
                    <Typography>{detailSample.size}</Typography>
                  </div>
                  <Divider type="vertical" />
                  <div className="headerDetail-inf_item">
                    <Typography>Thời gian</Typography>
                    <Typography>
                      {moment(detailSample.time_edit).format("DD/MM/YYYY")}
                    </Typography>
                  </div>
                  <Divider type="vertical" />
                  {detailSample.filetype === "DLL" ? (
                    <DllIcon fontSize={50} />
                  ) : (
                    <ExeIcon fontSize={50} />
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    marginTop: "10px",
                  }}
                >
                  <Button
                    style={{ marginRight: "8px" }}
                    icon={
                      <DownloadOutlined
                        style={{
                          fontSize: "18px",
                          color: "#1677ff",
                        }}
                      />
                    }
                  />

                  <Button
                    onClick={handleDeleteSample}
                    icon={
                      <DeleteOutlined
                        style={{ fontSize: "18px", color: "red" }}
                      />
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <Space className="commonInf_wrapper" direction="vertical">
            <Row className="commonInf-row" style={{ width: "100%" }}>
              <Col span={12} className="commonInfRow-col">
                <Col span={6}>Hash</Col>
                <Col span={18}>{detailSample.hash}</Col>
              </Col>
              <Col span={12} className="commonInfRow-col">
                <Col span={6}>Time edit</Col>
                <Col span={18}>
                  {moment(detailSample.time_edit).format("HH:mm:ss DD/MM/YYYY")}
                </Col>
              </Col>
            </Row>
            <Row>
              <Col span={12} className="commonInfRow-col">
                <Col span={6}>File name</Col>
                <Col span={18}>{detailSample.file_name}</Col>
              </Col>
              <Col span={12} className="commonInfRow-col">
                <Col span={6}>Architecture</Col>
                <Col span={18}>{detailSample.architecture}</Col>
              </Col>
            </Row>
            <Row>
              <Col span={12} className="commonInfRow-col">
                <Col span={6}>Endianness</Col>
                <Col span={18}>
                  {detailSample.endianness === "LE"
                    ? "Little Endian"
                    : "Big Endian"}
                </Col>
              </Col>
              <Col span={12} className="commonInfRow-col">
                <Col span={6}>mode</Col>
                <Col span={18}>{detailSample.mode}</Col>
              </Col>
            </Row>
            <Row>
              <Col span={12} className="commonInfRow-col">
                <Col span={6}>Operation system</Col>
                <Col span={18}>{detailSample.operation_system}</Col>
              </Col>
              <Col span={12} className="commonInfRow-col">
                <Col span={6}>size</Col>
                <Col span={18}>{detailSample.size}</Col>
              </Col>
            </Row>
            <Row>
              <Col span={12} className="commonInfRow-col">
                <Col span={6}>Type</Col>
                <Col span={18}>{detailSample.type}</Col>
              </Col>
              <Col span={12} className="commonInfRow-col">
                <Col span={6}>Entropy score</Col>
                <Col span={18}>{detailSample.entropy_score}</Col>
              </Col>
            </Row>
            <Row>
              <Col span={12} className="commonInfRow-col">
                <Col span={6}>Is packed</Col>
                <Col span={18}>
                  {detailSample.is_packed ? "Đã pack" : "Chưa pack"}
                </Col>
              </Col>
              <Col span={12} className="commonInfRow-col">
                <Col span={6}>File type</Col>
                <Col span={18}>{detailSample.filetype}</Col>
              </Col>
            </Row>
          </Space>
          <VirustotalGrap data={detailSample} />
        </div>
      )}
    </>
  );
};

export default DetailFile;
