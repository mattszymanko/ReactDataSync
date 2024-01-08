// src/api/middleware/requestTransformer.ts

// Importing dependencies
import { AxiosRequestConfig } from 'axios';

// Request transformation middleware function
const requestTransformer = (config: AxiosRequestConfig): AxiosRequestConfig => {
  // Adding common headers, authentication tokens, or other request modifications
  config.headers['X-Requested-With'] = 'XMLHttpRequest';

  // Sample logic for adding an authentication token
  const authToken = localStorage.getItem('authToken');
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`;
  }

  // Log the transformed request for debugging purposes
  console.log('Request Transformation:', config);

  return config;
};

export default requestTransformer;
