// Bootstrap imports
import { Container, Row } from 'react-bootstrap';

// Component imports
import Create from './components/Create';
import Retrieve from './components/Retrieve';
import Destroy from './components/Destroy';

const App = () => {
  return (
    <Container fluid className='mt-5'>
      <Row xs={1} lg={3} className='g-4'>
        <Create />
        <Retrieve />
        <Destroy />
      </Row>
    </Container>
  );
};

export default App;
