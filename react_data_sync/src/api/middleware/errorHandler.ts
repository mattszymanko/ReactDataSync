// /src/api/middleware/errorHandler.ts

// Importing dependencies
import { AxiosError } from 'axios';

// Define the error handler middleware function type
export type ErrorHandler = (error: AxiosError) => Promise<AxiosError>;

// Error handler middleware
const errorHandler = (error: AxiosError): Promise<AxiosError> => {
  // Custom logic for handling API errors
  console.error('Error Handler Middleware:', error);

  // Example: Returning a rejected promise with the original error
  return Promise.reject(error);
};

export default errorHandler;
