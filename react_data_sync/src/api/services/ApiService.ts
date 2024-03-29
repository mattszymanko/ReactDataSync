// /src/api/services/ApiService.ts

// Importing dependencies
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Defining the ApiService class
class ApiService {
  private api: AxiosInstance;
  private cache: Map<string, any>;

  // Constructor to initialize Axios instance with base configuration
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL || 'https://api.example.com',
      timeout: 10000, // 10 seconds timeout
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Initialize cache
    this.cache = new Map();
    
    // Adding request interceptors for logging or additional global request configurations
    this.api.interceptors.request.use((config: AxiosRequestConfig) => {
      console.log('Request Interceptor:', config);
      return config;
    });
    
    // Adding a global error interceptor
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        logger.error(`API Request Error: ${error.message}`);
        return Promise.reject(error);
      }
    );
    
    // Adding response interceptors for logging or additional global response configurations
    this.api.interceptors.response.use((response: AxiosResponse) => {
      console.log('Response Interceptor:', response);
      return response;
      // Cache the response
      this.cache.set(response.config.url || '', response.data);
      return response;      
    });
  }

  // Generic method for making GET requests
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.get<T>(url, config);
    return response.data;
    // Check if the response is already cached
    if (this.cache.has(url)) {
      console.log('Using cached response for:', url);
      return this.cache.get(url);
  }
    // Make a new request if not cached
    const response = await this.api.get<T>(url, config);
    return response.data;    
  }  

  // Generic method for making POST requests
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.post<T>(url, data, config);
    return response.data;
  }

  // Generic method for making PUT requests
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.put<T>(url, data, config);
    return response.data;
  }

  // Generic method for making DELETE requests
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.delete<T>(url, config);
    return response.data;
  }
  
  // Method to add custom headers to the axios request
  export const getDataWithCustomHeaders = (endpoint: string, customHeaders: Record<string, string>) => {
    return axios.get(`${config.API_BASE_URL}/${endpoint}`, { headers: { ...customHeaders } });
  }

  // Method for flexible middleware chaining 
  export const createMiddlewareChain = (...middlewares: MiddlewareFunction[]) => {
    return (request, next) => {
      middlewares.forEach(middleware => middleware(request, next));
    }
  }

  // Method to add middleware to the ApiService instance
  use(middleware: (config: AxiosRequestConfig) => AxiosRequestConfig): void {
    this.api.interceptors.request.use(middleware);
  }
  
  // Method for paginated requests
  export const getPaginatedData = (endpoint: string, page: number, pageSize: number) => {
    return axios.get(`${config.API_BASE_URL}/${endpoint}`, {
      params: { page, pageSize },
    });
  };  
}

export default ApiService;
