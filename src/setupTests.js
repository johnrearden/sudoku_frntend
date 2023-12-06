// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { handlers} from './mocks/handlers';

// Create a server with the handlers defined in mocks/handlers.js
const server = setupServer(...handlers);

// Start the server before any test is run
beforeAll(() => server.listen());

// Reset the handlers after each test
afterEach(() => server.resetHandlers());

// Close the server after all tests have been run
afterAll(() => server.close());

