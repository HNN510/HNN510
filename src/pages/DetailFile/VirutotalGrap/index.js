import { Space } from "antd";
import Typography from "antd/es/typography/Typography";
import { Circle } from "rc-progress";
import React, { useState } from "react";
import "./style.scss";
import VirustotalModal from "./component/virusTotalModal";
import RuleModal from "./component/ruleModal";
import { ReactComponent as WarningIcon } from "../../../assets/svg/warning.svg";
import "../../../assets/images/8019228.webp";
const VirustotalGrap = (props) => {
  const { data } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRule, setIsOpenRule] = useState(false);
  const handleDetailVirustotal = () => {
    setIsOpen(true);
    if (Object.keys(data.result.virustotal).length === 0) {
      setIsOpen(false);
    }
  };
  const handleDetailRule = () => {
    setIsOpenRule(true);
  };
  const renderColor = (score) => {
    let color = "";
    if (score >= 0 && score <= 50) {
      color = "#39ac4c";
    } else if (score > 50 && score <= 80) {
      color = "orange";
    } else {
      color = "#FF0000";
    }
    return color;
  };
  const checkObjectGrapUndefine =
    !data.result.virustotal &&
    !data.result.rule &&
    !data.result.ai_static &&
    !data.result.ai_dynamic;
  return (
    <div style={{ marginTop: "30px" }}>
      <Space direction="horizontal" className="virustotalGrapRow">
        {data.result.virustotal ? (
          <div className="virustotalGrapItem">
            <div
              onClick={handleDetailVirustotal}
              className="virustotalGrapItem_hover"
            >
              <Typography
                style={{
                  color: "#000",
                  fontWeight: "bolder",
                  marginBottom: "10px",
                }}
              >
                Virustotal
              </Typography>
              <div
                className="virustotalGrapItem-content"
                style={{ width: "100%" }}
              >
                {Object.keys(data.result.virustotal).length === 0 ? (
                  <div>
                    <WarningIcon style={{ width: "250px", height: "270px" }} />
                    <Typography>Hash not found</Typography>
                  </div>
                ) : (
                  <>
                    <Circle
                      percent={(
                        (data.result.virustotal.positives /
                          data.result.virustotal.total) *
                        100
                      ).toFixed(0)}
                      strokeWidth={5}
                      trailWidth={5}
                      strokeColor={renderColor(
                        (
                          (data.result.virustotal.positives /
                            data.result.virustotal.total) *
                          100
                        ).toFixed(0)
                      )}
                      className="virustotalGrap"
                    />
                    <div className="scoreGrap">
                      <Typography
                        className="scoreGrap_number"
                        style={{
                          color: renderColor(
                            (
                              (data.result.virustotal.positives /
                                data.result.virustotal.total) *
                              100
                            ).toFixed(0)
                          ),
                          fontSize: "2rem",
                        }}
                      >
                        {data.result.virustotal.positives}
                      </Typography>
                      <Typography>/</Typography>
                      <Typography>{data.result.virustotal.total}</Typography>
                    </div>
                  </>
                )}
              </div>
            </div>

            <VirustotalModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              virustotal={data.result.virustotal}
            />
          </div>
        ) : (
          <></>
        )}

        {data.result.rule ? (
          <div className="virustotalGrapItem">
            <div
              onClick={handleDetailRule}
              className="virustotalGrapItem_hover"
            >
              <Typography
                style={{
                  color: "#000",
                  fontWeight: "bolder",
                  marginBottom: "10px",
                }}
              >
                Luật
              </Typography>
              <Circle
                percent={data.result.rule.score}
                strokeWidth={5}
                trailWidth={5}
                strokeColor={renderColor(data.result.rule.score)}
                className="virustotalGrap"
              />
            </div>

            <div className="scoreGrap">
              <Typography
                className="scoreGrap_number"
                style={{
                  color: renderColor(data.result.rule.score),
                  fontSize: "2rem",
                }}
              >
                {data.result.rule.score}
              </Typography>
              <Typography>/</Typography>
              <Typography>100</Typography>
            </div>
            <RuleModal
              isOpen={isOpenRule}
              setIsOpen={setIsOpenRule}
              rule={data.result.rule}
            />
          </div>
        ) : (
          <></>
        )}
        {data.result.ai_static ? (
          <div className="virustotalGrapItem">
            <Typography
              style={{
                color: "#000",
                fontWeight: "bolder",
                marginBottom: "10px",
              }}
            >
              Phân tích tĩnh
            </Typography>
            <Circle
              percent={data.result.ai_static}
              strokeWidth={5}
              trailWidth={5}
              strokeColor={renderColor(data.result.ai_static)}
              className="virustotalGrap"
            />
            <div className="scoreGrap">
              <Typography
                className="scoreGrap_number"
                style={{
                  color: renderColor(data.result.ai_static),
                  fontSize: "2rem",
                }}
              >
                {data.result.ai_static.toFixed(0)}
              </Typography>
              <Typography>/</Typography>
              <Typography>100</Typography>
            </div>
          </div>
        ) : (
          <></>
        )}

        {data.result.ai_dynamic ? (
          <div className="virustotalGrapItem">
            <Typography
              style={{
                color: "#000",
                fontWeight: "bolder",
                marginBottom: "10px",
              }}
            >
              Phân tích động
            </Typography>
            <Circle
              percent={data.result.ai_dynamic}
              strokeWidth={5}
              trailWidth={5}
              strokeColor={renderColor(data.result.ai_dynamic)}
              className="virustotalGrap"
            />
            <div className="scoreGrap">
              <Typography
                className="scoreGrap_number"
                style={{
                  color: renderColor(data.result.ai_dynamic),
                  fontSize: "2rem",
                }}
              >
                {data.result.ai_dynamic.toFixed(0)}
              </Typography>
              <Typography>/</Typography>
              <Typography>100</Typography>
            </div>
          </div>
        ) : (
          <></>
        )}
        {checkObjectGrapUndefine && (
          <div style={{width: "100%", textAlign: 'center'}}>
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-8867280-7265556.png?f=webp"
              alt="image not data grap"
            />
          </div>
        )}
      </Space>
    </div>
  );
};

export default VirustotalGrap;
