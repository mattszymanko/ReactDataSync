// /apiConfig.js
// Change it accordingly

const config = {
  development: {
    API: {
      BASE_URL: 'http://localhost:5000/api', 
      DEFAULT_TIMEOUT: 5000,
      ENDPOINTS: {
        USERS: '/users',
        POSTS: '/posts',
        COMMENTS: '/comments',
      },
      ENDPOINT_TIMEOUTS: {
        USERS: 3000,
        POSTS: 7000,
        COMMENTS: 4000,
      },
    },
    DATABASE: {
      HOST: 'localhost',
      PORT: 27017,
      NAME: 'dev_database',
    },
    LOGGING: {
      LEVEL: 'debug',
    },
  },
  production: {
    API: {
      BASE_URL: 'https://example', 
      DEFAULT_TIMEOUT: 10000,
      ENDPOINTS: {
        USERS: '/users',
        POSTS: '/posts',
        COMMENTS: '/comments',
      },
      ENDPOINT_TIMEOUTS: {
        USERS: 5000,
        POSTS: 12000,
        COMMENTS: 8000,
      },
    },
    DATABASE: {
      HOST: 'prod-database-host',
      PORT: 27017,
      NAME: 'prod_database',
    },
    LOGGING: {
      LEVEL: 'info',
    },
  },
};

const currentEnvironment = process.env.NODE_ENV || 'development';

export default config[currentEnvironment];
