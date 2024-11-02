// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
  
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Nodejs Auth API',
      version: '1.0.0',
      description: 'A very simple user management CRUD API operation',
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: 'Erewharighe Ezra',
        url: 'https://linkedin.com/in/ezra-erewharighe'
      },
      servers: [
        {
          url: "http://localhost:9050",
        },
      ]
    },
    schemes: ['http', 'https']
  },
  apis: ['./routes/*.js'], // Path to your API routes
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi,
};