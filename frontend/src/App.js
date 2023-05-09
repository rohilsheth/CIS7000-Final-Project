import logo from './logo.svg';
import './App.css';
import NavBarIcon from './NavBarIcon';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import React, { useRef, useState} from 'react';
import Spinner from 'react-bootstrap/Spinner'; 
import './LoadingOverlay.css';



function App() {
  const [clinicalHistory, setClinicalHistory] = useState('');
  const [specificInstructions, setSpecificInstructions] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  

  const handleSubmit = async (event) => {
    console.log("submitted")
    event.preventDefault();
    setIsLoading(true);

    try {
      const { Configuration, OpenAIApi } = require("openai");
      const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      const note_prompt = "You are an assistant for a doctor writing the discharge note for a patient to understand. This should include what happened in the visit, what they should do at home, and any medication they need to take upon release. Make sure to specify any medication changes. Assume the patient has a 5th grade level of medical understanding. Here is their clinical history: \n\n" + clinicalHistory + "\n\n And here are specific instructions that the doctor has specified: " + specificInstructions;
      console.log(prompt)
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: note_prompt}],
      });
      console.log(response.data.choices)

      if (response.data.choices && response.data.choices.length > 0) {
        setGeneratedText(response.data.choices[0].message.content.trim());
      }
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="App">
      <NavBarIcon />
      <div className="min-vh-100 d-flex align-items-center">
        <Container className="w-75 mx-auto">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Clinical History</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={10}
                    placeholder="Enter clinical history here:"
                    value={clinicalHistory}
                    onChange={(e) => setClinicalHistory(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
                  <Form.Label>Specific Instructions</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    placeholder="Enter specific guidelines you want the generation to follow here:"
                    value={specificInstructions}
                    onChange={(e) => setSpecificInstructions(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Discharge Note Generated Output</Form.Label>
                  <Form.Control as="textarea" rows={15} type="text" readOnly value={generatedText} />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Container>
        {isLoading && (
          <div className="loading-overlay">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
