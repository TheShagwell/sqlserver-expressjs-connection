// swagger.mjs
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
  
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express JS CRUD API',
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
  apis: ['./routes/*.mjs'], // Path to your API routes
};

const specs = swaggerJsdoc(options);

export {
  specs,
  swaggerUi,
};