import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Curotec AsPI",
      version: "1.0.0",
      description: "Curotec API Documentation",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    tags: [
      {
        name: "Posts",
        description: "Operations related to posts",
      },
      {
        name: "Auth",
        description: "Operations related to user authentication",
      },
    ],
  },
  apis: [
    "./src/infrastructure/web/routes/*.ts",
    "./src/application/dto/**/*.ts",
  ],
};

export const setupSwagger = (app: Express) => {
  const specs = swaggerJsdoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  app.get("/api-json", (req, res) => {
    res.send(specs);
  });
};
