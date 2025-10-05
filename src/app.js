// Dependencies
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const statusRoute = require("./routes/status");
const nearbyRestaurantsSearchRoute = require("./routes/nearbyRestaurantSearch.js")
const restaurantNutritionSearchRoute = require("./routes/restaurantNutritionSearch.js")

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8626;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Macroly API",
      version: "1.0.0",
      description: "API for Macroly application",
    },
  },
  apis: ["./src/routes/*.js"],
};
const swaggerDocumentation = swaggerJsdoc(swaggerOptions);

app.use(
  "/macroly-api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocumentation)
);

app.use(cors());
app.use("/status", statusRoute);
app.use("/nearbyRestaurantSearch", nearbyRestaurantsSearchRoute)
app.use("/restaurantNutritionSearch", restaurantNutritionSearchRoute)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
