// React imports
import React, { useState } from 'react';

// react-bootstrap imports
import { Button, Card, Col, Form, FormControlProps } from 'react-bootstrap';

const Create = (): JSX.Element => {
  const [apiResponse, setApiResponse] = useState(false);
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const onSubmit = () => {
    console.log(key);
    console.log(value);
  }

  return (
    <Col>
      <Card border='success'>
        <Card.Header>Store Value at Given Key</Card.Header>
        <Card.Body>
          <Card.Title>Instructions</Card.Title>
          <Card.Text>Enter a Key, Value and click Submit.</Card.Text>
          <Form className='d-grid gap-2'>
            <Form.Group className='mb-3' controlId='formKey'>
              <Form.Label>Key</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter key'
                onChange={(e) => setKey(e.target.value)}
                value={key}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formValue'>
              <Form.Label>Value</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter value'
                onChange={(e) => setValue(e.target.value)}
                value={value}
              />
            </Form.Group>
            {apiResponse ? <p>Key successfully created!</p> : null}
            <Button onClick={onSubmit} variant='success' type='button'>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Create;
