const express = require("express");
const router = express.Router();
const { searchNearbyRestaurants } = require("../services/searchNearbyRestaurants");
const { searchRestaurantNutrition } = require("../services/searchRestaurantNutrition");
const { getMacroDistance } = require("../utils/macroDistance");
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
  console.log('Found restaurants')
  // now we have restaurants and vicinities, we need to get nutrition info for each restaurant
  restaurants = restaurants.slice(0, 25); // limit api traffic while using free stuff
  let bestMatches = [];
  for (const restaurant of restaurants){
    const meals = await searchRestaurantNutrition(restaurant.name);
    for (const meal of meals){
      const item = {
        name: meal.food_name,
        fatSecretId: meal.food_id,
        restaurant: restaurant.name,
        vicinity: restaurant.vicinity,
        calories: parseFloat(meal.caloriesMeal),
        fat: parseFloat(meal.fatMeal),
        carbs: parseFloat(meal.carbsMeal),
        protein: parseFloat(meal.proteinMeal),
        distance: getMacroDistance(
          parseFloat(meal.caloriesMeal),
          parseFloat(meal.fatMeal),
          parseFloat(meal.proteinMeal),
          parseFloat(meal.carbsMeal),
          parseFloat(calories),
          parseFloat(fat),
          parseFloat(protein),
          parseFloat(carbs)),
      }
      bestMatches.push(item);
    }
  }
  bestMatches.sort((a, b) => a.distance - b.distance);
  console.log('Found meals')

  const finalMatches = [];
  const restaurantCount = {};

  for (const meal of bestMatches) {
    const rest = meal.restaurant;

    if (!restaurantCount[rest]) restaurantCount[rest] = 0;

    if (restaurantCount[rest] < 3) {
      finalMatches.push(meal);
      restaurantCount[rest]++;
    }
    
    if (finalMatches.length >= 40) break;
  }

  response.json(finalMatches);
});

module.exports = router;
