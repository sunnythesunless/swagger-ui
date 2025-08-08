const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Express API',
      version: '1.0.0',
      description: 'A simple Express.js API with Swagger documentation',
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Development server' },
    ],
  },
  apis: ['./server.js'], // Path to files with JSDoc comments
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;