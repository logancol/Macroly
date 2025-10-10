const express = require("express");
const router = express.Router();
const { searchNearbyRestaurants } = require("../services/searchNearbyRestaurants");
const { searchRestaurantNutrition } = require("../services/searchRestaurantNutrition");
const { getMacroDistance } = require("../utils/macroDistance");
const { getMealImage } = require("../services/getMealImage");
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
  restaurants = await searchNearbyRestaurants(latitude, longitude, radius);
  // now we have restaurants and vicinities, we need to get nutrition info for each restaurant
  restaurants = restaurants.slice(0, 10); // limit api traffic while using free stuff
  const foodDescriptionRegex = /Calories:\s*(?<caloriesMeal>\d+(?:\.\d+)?)kcal\s*\|\s*Fat:\s*(?<fatMeal>\d+(?:\.\d+)?)g\s*\|\s*Carbs:\s*(?<carbsMeal>\d+(?:\.\d+)?)g\s*\|\s*Protein:\s*(?<proteinMeal>\d+(?:\.\d+)?)g/i;
  let bestMatches = []; // contains tuples of food_id and distance score
  for (const restaurant of restaurants){
    const meals = await searchRestaurantNutrition(restaurant.name);
    for (const meal of meals){
      const match = meal.food_description.match(foodDescriptionRegex);
      if (match) {
        const { caloriesMeal, fatMeal, carbsMeal, proteinMeal } = match.groups;
        const item = {
          name: meal.food_name,
          fatSecretId: meal.food_id,
          restaurant: restaurant.name,
          vicinity: restaurant.vicinity,
          calories: parseFloat(caloriesMeal),
          fat: parseFloat(fatMeal),
          carbs: parseFloat(carbsMeal),
          protein: parseFloat(proteinMeal),
          distance: getMacroDistance(
            parseFloat(caloriesMeal),
            parseFloat(fatMeal),
            parseFloat(proteinMeal),
            parseFloat(carbsMeal),
            parseFloat(calories),
            parseFloat(fat),
            parseFloat(protein),
            parseFloat(carbs))
        }
        bestMatches.push(item);
      }
    }
  }
  bestMatches.sort((a, b) => a.distance - b.distance);
  bestMatches = bestMatches.slice(0, 15);
  // ignore images for now and lets focus on a clean modern way of displaying the macro information
  response.json(bestMatches);
});

module.exports = router;
