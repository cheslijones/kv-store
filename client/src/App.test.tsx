import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import Create from './components/Create';
import Retrieve from './components/Retrieve';
import Destroy from './components/Destroy';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.post('http://localhost:8000/api/keys/', (req, res, ctx) => {
    
    return res(ctx.json({ key: 'hello', value: 'world' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const createSetup = () => {
  const utils = render(<Create />);
  const keyInput = utils.getByPlaceholderText('Enter key') as HTMLInputElement;
  const valueInput = utils.getByPlaceholderText('Enter value') as HTMLInputElement;
  return {
    keyInput,
    valueInput,
    ...utils,
  };
};

test('Create component renders', () => {
  render(<App />);
  const createComponent = screen.getByText(/Store Value at Given Key/i);
  expect(createComponent).toBeInTheDocument();
});

test('Create component renders', () => {
  render(<Create />);
  const createComponent = screen.getByText(/Store Value at Given Key/i);
  expect(createComponent).toBeInTheDocument();
});

test('Key field renders', () => {
  render(<Create />);
  const enterKeyField = screen.getByPlaceholderText(/Enter key/i);
  expect(enterKeyField).toBeInTheDocument();
});

test('Typing in key field', () => {
  const { keyInput } = createSetup();
  fireEvent.change(keyInput, { target: { value: 'abc' } });
  expect(keyInput.value).toBe('abc');
});

test('Value field renders', () => {
  render(<Create />);
  const enterValueField = screen.getByPlaceholderText(/Enter value/i);
  expect(enterValueField).toBeInTheDocument();
});

test('Typing in value field', () => {
  const { valueInput } = createSetup();
  fireEvent.change(valueInput, { target: { value: 'abc' } });
  expect(valueInput.value).toBe('abc');
});

test('Create and displays response', async () => {
  render(<Create />);
  console.log(fireEvent.click(screen.getByRole('button', { name: /Create/i })))


})


const retrieveSetup = () => {
  const utils = render(<Retrieve />);
  const keyInput = utils.getByPlaceholderText('Enter key') as HTMLInputElement;
  return {
    keyInput,
    ...utils,
  };
};

test('Retrieve component renders', () => {
  render(<App />);
  const retrieveComponent = screen.getByText(/Retrieve a Given Key/i);
  expect(retrieveComponent).toBeInTheDocument();
});

test('Retrieve component renders', () => {
  render(<Retrieve />);
  const retrieveComponent = screen.getByText(/Retrieve a Given Key/i);
  expect(retrieveComponent).toBeInTheDocument();
});

test('Typing in key field', () => {
  const { keyInput } = retrieveSetup();
  fireEvent.change(keyInput, { target: { value: 'abc' } });
  expect(keyInput.value).toBe('abc');
});


test('Retrieve and displays response', () => {
  render(<Retrieve />);
  fireEvent.click(screen.getByRole('button', { name: /Retrieve/i }));
});


const destroySetup = () => {
  const utils = render(<Destroy />);
  const keyInput = utils.getByPlaceholderText('Enter key') as HTMLInputElement;
  return {
    keyInput,
    ...utils,
  };
};

test('Delete component renders', () => {
  render(<App />);
  const deleteComponent = screen.getByText(/Delete a Given Key/i);
  expect(deleteComponent).toBeInTheDocument();
});

test('Delete component renders', () => {
  render(<Destroy />);
  const retrieveComponent = screen.getByText(/Delete a Given Key/i);
  expect(retrieveComponent).toBeInTheDocument();
});

test('Typing in key field', () => {
  const { keyInput } = destroySetup();
  fireEvent.change(keyInput, { target: { value: 'abc' } });
  expect(keyInput.value).toBe('abc');
});

test('Deletes and displays response', () => {
  render(<Destroy />);
  fireEvent.click(screen.getByRole('button', { name: /Delete/i }));
});
