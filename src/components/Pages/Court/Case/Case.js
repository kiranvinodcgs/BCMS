import React, { useState, useEffect } from "react";
import { Row, Button, Col, Badge, Form } from "react-bootstrap";
import { getJudges } from "../../../orbit";

const PetitionerForm = ({
  verifyEvidence,
  data,
  verifyReplication,
  verifyVakkalath,
  updateJudge,
}) => {
  const src = "http://localhost:9090/ipfs";
  const [judges, setJudges] = useState([]);

  useEffect(() => {
    const call = async () => {
      const res = await getJudges();
      setJudges(res);
    };
    data.court && call();
  }, [data]);

  return (
    <>
      <div className="rounded border m-3 p-4 shadow">
        <h1>{data.name}</h1>

        {data.court && <h4>Court Name :{data.court}</h4>}
        {data.dependant && <h4>Defendant Name :{data.dependant}</h4>}
        {data.dependant && <h4>Defendant Name :{data.dependant}</h4>}

        <Form.Group>
          <Form.Label>Assign Judge</Form.Label>
          <br />
          <Form.Select
            onChange={(e) => updateJudge(e.target.value)}
            value={data.judge || 1}
            className="mb-3 w-100"
          >
            <option value={0}>"None"</option>,
            {judges.map(
              (e) =>
                e.fullname &&
                e._id && <option value={e._id}>{e.fullname}</option>,
            )}
          </Form.Select>
        </Form.Group>

        <h3>Case Files</h3>

        {data &&
          data.files &&
          data.files.map((file) => {
            return (
              <>
                <img src={`${src}/${file.path}`} className="w-100" alt="" />
                <Badge
                  bg={
                    file.verification == null
                      ? "primary"
                      : file.verification
                      ? "success"
                      : "danger"
                  }
                  className="text-white pt-2 pb-2 ml-auto mr-auto d-block"
                >
                  {file.verification == null
                    ? "Unverified"
                    : file.verification
                    ? "Verified"
                    : "Rejected"}
                </Badge>
                <Row className={"mb-3 mt-1"}>
                  <Col>
                    <Button
                      variant={"success"}
                      onClick={() => verifyEvidence(file.path, true)}
                      className={"w-100"}
                    >
                      Verify
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant={"danger"}
                      onClick={() => verifyEvidence(file.path, false)}
                      className={"w-100"}
                    >
                      Reject
                    </Button>
                  </Col>
                </Row>
              </>
            );
          })}

        <h3>Replication</h3>
        {data && data.replication && (
          <>
            <img
              src={`${src}/${data.replication.path}`}
              className="w-100"
              alt=""
            />
            <Badge
              bg={
                data.replication.verification == null
                  ? "primary"
                  : data.replication.verification
                  ? "success"
                  : "danger"
              }
              className="text-white pt-2 pb-2 ml-auto mr-auto d-block"
            >
              {data.replication.verification == null
                ? "Unverified"
                : data.replication.verification
                ? "Verified"
                : "Rejected"}
            </Badge>
            <Row className={"mb-3 mt-1"}>
              <Col>
                <Button
                  variant={"success"}
                  onClick={() => verifyReplication(true)}
                  className={"w-100"}
                >
                  Verify
                </Button>
              </Col>
              <Col>
                <Button
                  variant={"danger"}
                  onClick={() => verifyReplication(false)}
                  className={"w-100"}
                >
                  Reject
                </Button>
              </Col>
            </Row>
          </>
        )}

        <h3 className={"mt-5"}>Vakkalathnama</h3>
        {data && data.vakkalath && (
          <>
            <img
              src={`${src}/${data.vakkalath.path}`}
              className="w-100"
              alt=""
            />
            <Badge
              bg={
                data.vakkalath.verification == null
                  ? "primary"
                  : data.vakkalath.verification
                  ? "success"
                  : "danger"
              }
              className="text-white pt-2 pb-2 ml-auto mr-auto d-block"
            >
              {data.vakkalath.verification == null
                ? "Unverified"
                : data.vakkalath.verification
                ? "Verified"
                : "Rejected"}
            </Badge>
            <Row className={"mb-3 mt-1"}>
              <Col>
                <Button
                  variant={"success"}
                  onClick={() => verifyVakkalath(true)}
                  className={"w-100"}
                >
                  Verify
                </Button>
              </Col>
              <Col>
                <Button
                  variant={"danger"}
                  onClick={() => verifyVakkalath(false)}
                  className={"w-100"}
                >
                  Reject
                </Button>
              </Col>
            </Row>
          </>
        )}
      </div>
    </>
  );
};

export default PetitionerForm;
