// src/api/index.ts

// Importing API service and middleware modules
import ApiService from './services/ApiService';
import RequestTransformerMiddleware from './middleware/requestTransformer';
import ResponseTransformerMiddleware from './middleware/responseTransformer';
import ErrorHandlerMiddleware from './middleware/errorHandler';

// Defining the API instance with middleware
const apiService = new ApiService();

// Applying middleware to the API service
apiService.use(RequestTransformerMiddleware);
apiService.use(ResponseTransformerMiddleware);
apiService.use(ErrorHandlerMiddleware);

// Exporting the configured API service
export default apiService;

// Additional API-related exports for convenient usage
export { RequestTransformerMiddleware, ResponseTransformerMiddleware, ErrorHandlerMiddleware };
