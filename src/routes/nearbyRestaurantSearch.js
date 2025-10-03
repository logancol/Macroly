const express = require("express");
const router = express.Router();
const { searchNearbyRestaurants } = require("../services/searchNearbyRestaurants");
/**
 * @openapi
 * /nearbyRestaurantSearch:
 *   get:
 *     summary: Get restaurants in given radiums of some lcoation
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
 *
 *     responses:
 *       200:
 *         description: A list of nearby restaurants
 */
router.get("/", async (request, response) => {
  const { latitude, longitude, radius } = request.query
  const data = await searchNearbyRestaurants(latitude, longitude, radius)
  response.json(data)
});

module.exports = router;
