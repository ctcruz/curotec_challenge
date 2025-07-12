import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerAutogen from "swagger-autogen";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Curotec API",
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
  },
  apis: [
    "./src/infrastructure/web/routes/*.ts",
    "./src/application/dto/**/*.ts",
  ],
};
const outputFile = "./src/infrastructure/web/docs/swagger-output.json";

export const setupSwagger = (app: Express) => {
  const specs = swaggerJsdoc(options);
  swaggerAutogen(outputFile, options.apis, options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  app.get("/swagger-output.json", (req, res) => {
    res.sendFile("./swagger-output.json", { root: __dirname });
  });
};
