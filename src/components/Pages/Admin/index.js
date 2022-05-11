import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Navbar from "../../SharedComponents/Navbar";
import mock from "../../../mock.json";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [data, setData] = useState(mock);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const filteredData = mock.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase()),
    );
    setData(filteredData);
  }, [search]);
  return (
    <>
      <Navbar />
      <Container className="mt-4 pt-1 mb-4">
        <h2 className="text-center mt-5">Admin Panel</h2>
        <Row className="justify-content-center">
          <Col md={8}>
            <Form>
              <Form.Group className="" controlId="exampleForm.ControlInput1">
                <Form.Control
                  type="email"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        {data.map((user) => (
          <Row className="justify-content-center ">
            <Col className="m-2 p-2 border border-dark rounded" md={4}>
              <div>Name: {user.name}</div>
              <div>Email: {user.email}</div>
              <div>Type: {user.type}</div>
              <Link
                to="/admin/edit"
                style={{ top: 8, right: 8 }}
                className="btn btn-primary position-absolute"
              >
                Edit
              </Link>
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
};

export default Homepage;
