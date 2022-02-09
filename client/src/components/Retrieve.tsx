// react-bootstrap imports
import { Card, Col } from 'react-bootstrap';

const Retrieve = (): JSX.Element  => {
  return (
    <Col>
      <Card>
        <Card.Header>Retrieve Value for a Given Key</Card.Header>
        <Card.Body>
          <Card.Title>Instructions</Card.Title>
          <Card.Text>
            Enter the Key and click Submit to retrieve value.
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Retrieve;
