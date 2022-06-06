import React, { useState } from "react";
import { Row, Button, Col, Badge } from "react-bootstrap";

const PetitionerForm = ({
  verifyEvidence,
  data,
  verifyReplication,
  verifyVakkalath,
}) => {
  const src = "http://localhost:9090/ipfs";

  return (
    <>
      <div className="rounded border m-3 p-4 shadow">
        <h1>{data.name}</h1>

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
