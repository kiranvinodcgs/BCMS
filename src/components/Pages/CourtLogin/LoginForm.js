import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginCourt } from "../../orbit";

const Homepage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      await loginCourt({ email, password });
      setLoading(false);
      navigate("/court");
    } catch (err) {
      console.log(err);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="rounded border m-3 p-4 shadow">
        <Form onSubmit={register} className="">
          <h5 className="text-center w-100">Court Official Login</h5>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          {error && (
            <Form.Text className="text-danger">
              Error! Invalid Credentials
            </Form.Text>
          )}
          <Button onClick={register} variant="primary w-100" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Homepage;
