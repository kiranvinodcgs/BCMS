import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Badge, Col } from "react-bootstrap";

const PetitionerForm = ({ title, _id }) => {
  console.log(_id);
  const navigate = useNavigate();
  return (
    <>
      <div className="rounded border m-3 p-4 shadow row">
        <Col>
          <h3>{title}</h3>
        </Col>
        <Col>
          <Button
          className={"ml-auto d-block"}
            onClick={() => {
              navigate(`/court/${_id}`);
            }}
          >
            View Case
          </Button>
        </Col>
      </div>
    </>
  );
};

export default PetitionerForm;
