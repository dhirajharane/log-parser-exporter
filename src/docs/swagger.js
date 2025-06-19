const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Log Parser & Exporter API',
      version: '1.0.0',
      description: 'API documentation for Log Parser'
    },
    servers: [{ url: 'http://localhost:7777' }],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token'
        }
      }
    }
  },
  apis: ['./src/docs/*.js']  // Point to docs files, not routes
};

module.exports = swaggerJsdoc(options);
