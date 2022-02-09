// React imports
import { useState } from 'react';

// react-bootstrap imports
import { Button, Card, Col, Form } from 'react-bootstrap';

/**
 * Component for retrieving a key / value pair in Redis.
 * @returns JSX.Element
 */
const Retrieve = (): JSX.Element  => {
  // Set state related to controlled form inputs and API response
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  /**
   * When the user clicks "Retrieve" this function is called.
   * @returns Void
   */
   const onSubmit = (): void => {

    // Allow submit only if key is populated
    if (key) {
      // POST the API 
      fetch(`http://localhost:8000/api/keys/${key}/`) 
        .then(response => response.json())
        .then(response => {
          setValue(response['value']);
        })
        .catch(() => {
          console.log('Error');
        })
    }
  }

  return (
    <Col>
      <Card border='primary'>
        <Card.Header>Retrieve a Given Key</Card.Header>
        <Card.Body>
          <Card.Title>Instructions</Card.Title>
          <Card.Text>Enter the Key and click Retrieve to retrieve key's value.</Card.Text>
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
            {value ? <p>Value: {value}</p> : null}
            <Button onClick={onSubmit} variant='primary' type='button'>
              Retrieve
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Retrieve;
