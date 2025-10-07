const express = require("express");
const router = express.Router();
const { searchNearbyRestaurants } = require("../services/searchNearbyRestaurants");
const { searchRestaurantNutrition } = require("../services/searchRestaurantNutrition");
/**
 * @openapi
 * /macroSearch:
 *   get:
 *     summary: Get ordered results from location/macronutrient query
 *     parameters:
 *       - in: query
 *         name: latitude
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: longitude
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: radius
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: protein
 *         required: true
 *         schema:
 *           type: number
  *       - in: query
 *         name: fat
 *         required: true
 *         schema:
 *           type: number
  *       - in: query
 *         name: carbs
 *         required: true
 *         schema:
 *           type: number
  *       - in: query
 *         name: calories
 *         required: true
 *         schema:
 *           type: number
 * 
 *     responses:
 *       200:
 *         description: Food items in radius of location matching macronutrient specs.
 */
router.get("/", async (request, response) => {
  const { latitude, longitude, radius, protein, fat, carbs, calories } = request.query
  // make call to search nearby restaurants
  const restaurants = await searchNearbyRestaurants(latitude, longitude, radius);
  // now we have restaurants and vicinities, we need to get nutrition info for each restaurant
  





  const data = await searchNearbyRestaurants(latitude, longitude, radius)
  response.json(data)
});

module.exports = router;
