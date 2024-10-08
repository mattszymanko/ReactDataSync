// /src/api/services/ApiService.ts

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import config from '../../../apiConfig';
import logger from '../../utils/logger';

type MiddlewareFunction = (config: AxiosRequestConfig) => AxiosRequestConfig;

class ApiService {
  private api: AxiosInstance;
  private cache: Map<string, any>;
  private globalTimeout: number;

  constructor() {
    this.globalTimeout = config.API.DEFAULT_TIMEOUT;
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL || config.API.BASE_URL,
      timeout: this.globalTimeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.cache = new Map();

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.api.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        logger.debug('Request Interceptor:', config);
        return config;
      },
      (error: AxiosError) => {
        logger.error('Request Error Interceptor:', error);
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        logger.debug('Response Interceptor:', response);
        this.cacheResponse(response);
        return response;
      },
      (error: AxiosError) => {
        logger.error('Response Error Interceptor:', error);
        return Promise.reject(error);
      }
    );
  }

  private cacheResponse(response: AxiosResponse): void {
    const url = response.config.url;
    if (url) {
      this.cache.set(url, response.data);
    }
  }

  private getTimeoutForEndpoint(url: string): number {
    const endpoint = Object.entries(config.API.ENDPOINTS).find(([_, value]) => url.startsWith(value));
    if (endpoint) {
      return config.API.ENDPOINT_TIMEOUTS[endpoint[0]] || this.globalTimeout;
    }
    return this.globalTimeout;
  }

  private async handleRequest<T>(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    config?: AxiosRequestConfig,
    data?: any
  ): Promise<T> {
    try {
      if (method === 'get' && this.cache.has(url)) {
        logger.debug('Using cached response for:', url);
        return this.cache.get(url);
      }

      const timeout = config?.timeout || this.getTimeoutForEndpoint(url);
      const requestConfig = { ...config, timeout };

      const response = await this.api[method]<T>(url, method === 'get' || method === 'delete' ? requestConfig : data, requestConfig);
      return response.data;
    } catch (error) {
      logger.error(`${method.toUpperCase()} Request Error:`, error);
      throw error;
    }
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.handleRequest<T>('get', url, config);
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.handleRequest<T>('post', url, config, data);
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.handleRequest<T>('put', url, config, data);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.handleRequest<T>('delete', url, config);
  }

  getDataWithCustomHeaders(endpoint: string, customHeaders: Record<string, string>) {
    return this.api.get(`${endpoint}`, { headers: { ...customHeaders } });
  }

  createMiddlewareChain(...middlewares: MiddlewareFunction[]) {
    return (config: AxiosRequestConfig): AxiosRequestConfig => {
      return middlewares.reduce((acc, middleware) => middleware(acc), config);
    };
  }

  use(middleware: MiddlewareFunction): void {
    this.api.interceptors.request.use(middleware);
  }

  getPaginatedData(endpoint: string, page: number, pageSize: number) {
    return this.api.get(`${endpoint}`, {
      params: { page, pageSize },
    });
  }

  setGlobalTimeout(timeout: number): void {
    this.globalTimeout = timeout;
    this.api.defaults.timeout = timeout;
  }
}

export default ApiService;
