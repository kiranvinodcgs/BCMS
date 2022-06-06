import React, { useState } from "react";
import { Form, Button, Badge } from "react-bootstrap";

const PetitionerForm = ({
  uploadEvidence,
  data,
  uploadReplication,
  uploadVakkalath,
}) => {
  const [file, setFile] = useState();
  const [replication, setReplication] = useState();
  const [vakkalath, setVakkalath] = useState();
  const [description, setDescription] = useState();
  const [replicationDescription, setReplicationDescription] = useState();
  const [vakkalathDescription, setVakkalathDescription] = useState();
  const src = "http://localhost:9090/ipfs";

  return (
    <>
      <div className="rounded border m-3 p-4 shadow">
        <h1>{data.name}</h1>

        <h3>Upload Case Files</h3>
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
              </>
            );
          })}

        <Form onSubmit={(e) => uploadEvidence(e, file, description)}>
          <Form.Group className="mt-2 mb-3">
            <Form.Label>Upload replication</Form.Label>
            <Form.Control
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
            />
          </Form.Group>
          <Form.Group className="mt-2 mb-3">
            <Form.Label>File Description</Form.Label>
            <Form.Control
              onChange={(e) => setDescription(e.target.value)}
              type="text"
            />
          </Form.Group>
          <Button
            onClick={(e) => uploadEvidence(e, file, description)}
            className="w-100 mb-3"
          >
            Submit Case File
          </Button>
        </Form>

        <h3 className={"mt-5"}>Upload Replication</h3>
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
          </>
        )}
        <Form
          onSubmit={(e) =>
            uploadReplication(e, replication, replicationDescription)
          }
        >
          <Form.Group className="mt-2 mb-3">
            <Form.Label>Upload Replication</Form.Label>
            <Form.Control
              onChange={(e) => setReplication(e.target.files[0])}
              type="file"
            />
          </Form.Group>
          <Form.Group className="mt-2 mb-3">
            <Form.Label>File Description</Form.Label>
            <Form.Control
              onChange={(e) => setReplicationDescription(e.target.value)}
              type="text"
            />
          </Form.Group>
          <Button
            onClick={(e) =>
              uploadReplication(e, replication, replicationDescription)
            }
            className="w-100 mb-3"
          >
            Submit Replication
          </Button>
        </Form>

        <h3 className={"mt-5"}>Upload Vakkalathnama</h3>
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
              {data.replication.verification == null
                ? "Unverified"
                : data.replication.verification
                ? "Verified"
                : "Rejected"}
            </Badge>
          </>
        )}
        <Form
          onSubmit={(e) =>
            uploadReplication(e, vakkalath, vakkalathDescription)
          }
        >
          <Form.Group className="mt-2 mb-3">
            <Form.Label>Upload Replication</Form.Label>
            <Form.Control
              onChange={(e) => setVakkalath(e.target.files[0])}
              type="file"
            />
          </Form.Group>
          <Form.Group className="mt-2 mb-3">
            <Form.Label>File Description</Form.Label>
            <Form.Control
              onChange={(e) => setVakkalathDescription(e.target.value)}
              type="text"
            />
          </Form.Group>
          <Button
            onClick={(e) => uploadVakkalath(e, vakkalath, vakkalathDescription)}
            className="w-100 mb-3"
          >
            Submit Replication
          </Button>
        </Form>

        <h3 className={"mt-5"}>Statement</h3>
        {data && data.statement ? (
          <>
            <img
              src={`${src}/${data.vakkalath.path}`}
              className="w-100"
              alt=""
            />
          </>
        ) : (
          "Statement not published"
        )}
      </div>
    </>
  );
};

export default PetitionerForm;
