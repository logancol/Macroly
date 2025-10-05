const express = require("express");
const router = express.Router();
const { searchRestaurantNutrition } = require("../services/searchRestaurantNutrition");
/**
 * @openapi
 * /restaurantNutritionSearch:
 *   get:
 *     summary: Just messing with this for now
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: A list of nearby restaurants
 */
router.get("/", async (request, response) => {
  const { name } = request.query
  const data = await searchRestaurantNutrition(name)
  response.json(data)
});

module.exports = router;
