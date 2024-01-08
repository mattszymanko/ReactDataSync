// react_data_sync/config.js
// Change it accordingly

const config = {
  development: {
    API: {
      BASE_URL: 'http://localhost:5000/api', 
      TIMEOUT: 5000,
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
      TIMEOUT: 10000,
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
