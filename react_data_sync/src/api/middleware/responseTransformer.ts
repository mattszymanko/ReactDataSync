// /src/api/middleware/responseTransformer.ts

// Importing dependencies
import { AxiosResponse } from 'axios';

// Response transformer middleware
const responseTransformer = (response: AxiosResponse): AxiosResponse => {
  // Custom logic for transforming the response
  console.log('Response Transformer Middleware:', response);

  // Example: Normalizing the response data
  if (response.data && response.data.results) {
    response.data = response.data.results;
  }

  return response;
};

export default responseTransformer;
