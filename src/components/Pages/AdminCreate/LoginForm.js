import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { createCourtUser, createJudgeUser } from "../../orbit";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (fullName && email && password) {
      setError(false);
      setLoading(true);
      if (type == 0) {
        await createCourtUser({ fullName, email, password });
      } else {
        await createJudgeUser({ fullName, email, password });
      }
      navigate("/admin");
    } else {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <div className="rounded border m-3 p-4 shadow">
        <Form onSubmit={submit} className="">
          <h5 className="text-center w-100">Edit</h5>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              placeholder="Enter Name"
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter Password"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Type</Form.Label>
            <br />
            <Form.Select
              onChange={(e) => setType(e.target.value)}
              className="mb-3 w-100"
            >
              <option value={0}>Court official</option>
              <option value={1}>Judge</option>
            </Form.Select>
          </Form.Group>
          <Button
            onClick={submit}
            disabled={loading}
            variant="primary w-100"
            type="submit"
          >
            Submit
          </Button>
          {error && (
            <Form.Text className="text-danger">
              Fill all the fields
            </Form.Text>
          )}
        </Form>
      </div>
    </>
  );
};

export default Homepage;
