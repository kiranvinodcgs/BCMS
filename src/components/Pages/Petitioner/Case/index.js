import React, { useEffect, useState } from "react";
import Securex from "../../../../artifacts/src/contracts/Securex.sol/Securex.json";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../../../SharedComponents/Navbar";
import Case from "./Case";
import { getCase } from "../../../orbit";
import { useParams } from "react-router-dom";
import Web3 from "web3";
import { addEvidence, addReplication, addVakkalath } from "../../../orbit";
const ipfsClient = require("ipfs-http-client");

const ipfs = ipfsClient({
  host: "localhost",
  port: 5002,
  protocol: "http",
});

const Homepage = () => {
  const [data, setData] = useState([]);
  const [securex, setSecurex] = useState();
  const [accounts, setAccounts] = useState();
  const [loading, setLoading] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await loadWeb3();
      await loadBlockchainData();
      const data = await getCase(id);
      setData(data);
    };

    fetchData();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!",
      );
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccounts(accounts[0]);
    const networkAddress = "0xA2Fd25d2d667b4efCFf01A35D0984e98984405F9";
    if (networkAddress) {
      const securex = new web3.eth.Contract(Securex.abi, networkAddress);
      setSecurex(securex);
    } else {
      window.alert("Securex contract not deployed to detected network.");
    }
  };

  const uploadEvidence = (event, file, description) => {
    event.preventDefault();
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = async () => {
      const buffer = Buffer(reader.result);

      ipfs.add(buffer, (error, result) => {
        console.log("Ipfs result", result);
        if (error) {
          console.error(error);
          return;
        }

        setLoading(true);
        console.log("here");

        securex.methods
          .registerEvidence(
            id,
            description,
            result[0].hash,
            new Date().toString(),
          )
          .send({ from: accounts })
          .on("transactionHash", async (hash) => {
            // window.location.reload();
            const res = await addEvidence(id, {
              path: result[0].hash,
              description: description,
              verification: null,
            });
            setData(res);
            setLoading(false);
          });
      });
    };
  };

  const uploadReplication = (event, file, description) => {
    event.preventDefault();
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = async () => {
      const buffer = Buffer(reader.result);

      ipfs.add(buffer, (error, result) => {
        console.log("Ipfs result", result);
        if (error) {
          console.error(error);
          return;
        }

        setLoading(true);

        console.log(result);
        securex.methods
          .registerEvidence(
            id,
            description,
            result[0].hash,
            new Date().toString(),
          )
          .send({ from: accounts })
          .on("transactionHash", async (hash) => {
            // window.location.reload();
            const res = await addReplication(id, {
              path: result[0].hash,
              description: description,
              verification: null,
            });
            setData(res);
            setLoading(false);
          });
      });
    };
  };

  const uploadVakkalath = (event, file, description) => {
    event.preventDefault();
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = async () => {
      const buffer = Buffer(reader.result);

      ipfs.add(buffer, (error, result) => {
        console.log("Ipfs result", result);
        if (error) {
          console.error(error);
          return;
        }

        setLoading(true);

        console.log(result);
        securex.methods
          .registerEvidence(
            id,
            description,
            result[0].hash,
            new Date().toString(),
          )
          .send({ from: accounts })
          .on("transactionHash", async (hash) => {
            // window.location.reload();
            const res = await addVakkalath(id, {
              path: result[0].hash,
              description: description,
              verification: null,
            });
            setData(res);
            setLoading(false);
          });
      });
    };
  };

  return (
    <>
      <Navbar account={accounts} />
      <Container className="mt-5">
        <Row>
          <Col>
            <h2 className="text-center mt-3 font-weight-bold">File Case</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={6}>
            <Case
              uploadEvidence={uploadEvidence}
              uploadReplication={uploadReplication}
              uploadVakkalath={uploadVakkalath}
              data={data}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Homepage;
