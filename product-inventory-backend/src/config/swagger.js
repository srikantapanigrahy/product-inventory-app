import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Swagger configuration
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product Inventory API",
      version: "1.0.0",
      description:
        "API documentation for Product Inventory Management System. Includes authentication, item, and sales endpoints."
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1",
        description: "Local server"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        },
        apiKeyAuth: {              
          type: "apiKey",
          in: "header",
          name: "x-api-key", 
          description: "Provide your API key for authentication"
        }
      }
    },
    security: [
      {
        bearerAuth: [],
        apiKeyAuth: []
      }
    ]
  },
  apis: ["./src/routes/*.js"] // Path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
