// React imports
import { useState } from 'react';

// react-bootstrap imports
import { Button, Card, Col, Form } from 'react-bootstrap';

/**
 * Component for creating a key / value pair in Redis.
 * @returns JSX.Element
 */
const Create = (): JSX.Element => {
  // Set state related to controlled form inputs and API response
  const [apiResponse, setApiResponse] = useState(false);
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  /**
   * When the user clicks "Create" this function is called.
   * @returns Void
   */
  const onSubmit = (): void => {
    // Set request body
    const body = { key: key, value: value}

    // POST the request body to the API 
    fetch('http://localhost:8000/api/keys/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }) 
      .then(response => response.json())
      .then(response => {
        setApiResponse(true);
      })
      .catch(() => {
        console.log('Error');
      })
  }

  return (
    <Col>
      <Card border='success'>
        <Card.Header>Store Value at Given Key</Card.Header>
        <Card.Body>
          <Card.Title>Instructions</Card.Title>
          <Card.Text>Enter a Key, Value and click Create.</Card.Text>
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
              Create
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Create;