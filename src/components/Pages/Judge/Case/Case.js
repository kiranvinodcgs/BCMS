import React, { useState } from "react";
import { Row, Button, Col, Badge, Form } from "react-bootstrap";

const PetitionerForm = ({ data, uploadStatement }) => {
  const [statement, setStatement] = useState();
  const [statementDescription, setStatementDescription] = useState();
  const [error, setError] = useState(false);

  const src = "http://localhost:9090/ipfs";

  return (
    <>
      <div className="rounded border m-3 p-4 shadow">
        <h1>{data.name}</h1>

        {data.court && <h4>Court Name :{data.court}</h4>}
        {data.dependant && <h4>Defendant Name :{data.dependant}</h4>}
        {data.nature && <h4>Nature :{data.nature}</h4>}

        <h3>Case Files</h3>
        {data &&
          data.files &&
          data.files.map((file) =>
            file.verification ? (
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
              </>
            ) : (
              "No Files found"
            ),
          )}

        <h3 className={"mt-5"}>Replication</h3>
        {data && data.replication && data.replication.verification === true ? (
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
          </>
        ) : (
          "No verified replication"
        )}

        <h3 className={"mt-5"}>Vakkalathnama</h3>
        {data && data.vakkalath && data.replication.verification === true ? (
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
          </>
        ) : (
          "No verified vakalath"
        )}

        <h3 className={"mt-5"}>Upload statement</h3>
        {data && data.statement && (
          <>
            <img
              src={`${src}/${data.statement.path}`}
              className="w-100"
              alt=""
            />
          </>
        )}
        <Form
          onSubmit={(e) => {
            if (statement && statementDescription) {
              uploadStatement(e, statement, statementDescription);
              setError(false);
            } else {
              setError(true);
            }
          }}
        >
          <Form.Group className="mt-2 mb-3">
            <Form.Label>Upload Statement</Form.Label>
            <Form.Control
              onChange={(e) => setStatement(e.target.files[0])}
              type="file"
            />
          </Form.Group>
          <Form.Group className="mt-2 mb-3">
            <Form.Label>File Description</Form.Label>
            <Form.Control
              onChange={(e) => setStatementDescription(e.target.value)}
              type="text"
            />
          </Form.Group>
          <Button
            onClick={(e) => {
              if (statement && statementDescription) {
                uploadStatement(e, statement, statementDescription);
                setError(false);
              } else {
                setError(true);
              }
            }}
            className="w-100 mb-3"
          >
            Submit statement
          </Button>
          {error && (
            <Form.Text className="text-danger">Fill all the fields </Form.Text>
          )}
        </Form>
      </div>
    </>
  );
};

export default PetitionerForm;
