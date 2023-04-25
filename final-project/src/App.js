import logo from './logo.svg';
import './App.css';
import NavBarIcon from './NavBarIcon';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import React, { useRef } from 'react';

function App() {
  return (
    <div className="App">
      <NavBarIcon />
      <div className="min-vh-100 d-flex align-items-center">
        <Container className="w-75 mx-auto">
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Clinical History</Form.Label>
                  <Form.Control as="textarea" rows={10} placeholder="Enter clinical history here:" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
                  <Form.Label>Specific Instructions</Form.Label>
                  <Form.Control as="textarea" rows={1} placeholder="Enter specific guidelines you want the generation to follow here:" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Discharge Note Generation Output</Form.Label>
                  <Form.Control as="textarea" type="text" rows={15} readOnly value="Content to be copied" />
                  <Button className="mt-2" variant="secondary">
                    Copy to clipboard
                  </Button>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default App;
