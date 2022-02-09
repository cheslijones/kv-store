import { render, screen } from '@testing-library/react';
import App from './App';

test('Create component renders', () => {
  render(<App />);
  const createComponent = screen.getByText(/Store Value at Given Key/i);
  expect(createComponent).toBeInTheDocument();
});

test('Retrieve component renders', () => {
  render(<App />);
  const retrieveComponent = screen.getByText(/Retrieve a Given Key/i);
  expect(retrieveComponent).toBeInTheDocument();
});

test('Delete component renders', () => {
  render(<App />);
  const deleteComponent = screen.getByText(/Delete a Given Key/i);
  expect(deleteComponent).toBeInTheDocument();
});
