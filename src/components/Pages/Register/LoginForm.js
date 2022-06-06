import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../orbit";

const Homepage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const register = async (e) => {
    e.preventDefault();

    await createUser({ fullName, email, phone, address, password });
    setLoading(true);
    setError(false);
    try { 
    } catch (err) {
      setError(true);
      setLoading(false);
    }
    setLoading(false);
    const navigate = useNavigate()
    navigate.push("/")
  };

  return (
    <>
      <div className="rounded border m-3 p-4 shadow">
        <Form onSubmit={register} className="">
          <h5 className="text-center w-100">Petitioner Register</h5>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              placeholder="Enter full name"
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
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              placeholder="Enter phone number"
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Address</Form.Label>
            <Form.Control
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="Enter address"
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
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              onChange={(e) => setPasswordConfirm(e.target.value)}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          <Button disabled={loading} variant="primary w-100" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Homepage;
