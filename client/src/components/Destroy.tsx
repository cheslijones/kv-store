// react-bootstrap imports
import { Card, Col } from 'react-bootstrap';

const Destroy = (): JSX.Element  => {
  return (
    <Col>
      <Card>
        <Card.Header>Delete a Given Key</Card.Header>
        <Card.Body>
          <Card.Title>Instructions</Card.Title>
          <Card.Text>Enter the Key and click Submit to delete pair.</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Destroy;
