import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Navbar from "../../SharedComponents/Navbar";
import CaseStatus from "./CaseStatus";
import { getCaseForUser } from "../../orbit";
import { useNavigate } from "react-router-dom"

const Homepage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("user_id");
      const data = await getCaseForUser(userId);
      setData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Container className="mt-5">
        <Row>
          <Col>
            <h2 className="text-center mt-3 font-weight-bold">File Case</h2>
          </Col>
        </Row>
        <Row>
          <div className="ml-auto mr-auto">
            <Button variant={"success"} onClick={() => navigate("/petitioner/file")}>File new case</Button>
          </div>
        </Row>
        <Row className="justify-content-center">
          <Col md={6}>
            {data.map((data) => (
              <CaseStatus title={data.name} _id={data._id} />
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Homepage;
