// React imports
import { useState } from 'react';

// react-bootstrap imports
import { Button, Card, Col, Form } from 'react-bootstrap';

/**
 * Component for destroying a key / value pair in Redis.
 * @returns JSX.Element
 */
const Destroy = (): JSX.Element => {
  // Set state related to controlled form inputs and API response
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  /**
   * When the user clicks "Delete" this function is called.
   * @returns Void
   */
  const onSubmit = (): void => {
    // Only submit if field is populted
    if (key) {
      // POST the API
      fetch(`http://localhost:8000/api/keys/${key}/`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((response) => {
          setValue(response['value']);
        })
        .catch(() => {
          console.log('Error');
        });
    }
  };

  return (
    <Col>
      <Card border='danger'>
        <Card.Header>Delete a Given Key</Card.Header>
        <Card.Body>
          <Card.Title>Instructions</Card.Title>
          <Card.Text>Enter the Key and click Delete to delete key.</Card.Text>
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
            {value ? <p>Response: {value}</p> : null}
            <Button onClick={onSubmit} variant='danger' type='button'>
              Delete
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Destroy;
