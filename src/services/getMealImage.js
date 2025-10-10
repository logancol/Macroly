// Hit nutritionix api with restaurant name or info

const axios = require('axios');

// Endpoints
const fatSecretURL = "https://platform.fatsecret.com/rest/food/v5"
const TOKEN_URL = "https://oauth.fatsecret.com/connect/token";

// Get a fresh access token (valid for 1 hour)
async function getAccessToken() {
  try {
    const response = await axios.post(
      TOKEN_URL,
      new URLSearchParams({
        grant_type: "client_credentials",
        scope: "basic"
      }),
      {
        auth: {
          username: process.env.FATSECRETOAUTH_ID,
          password: process.env.FATSECRETOAUTH_SECRET
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting FatSecret access token:", error.response?.data || error.message);
    throw err;
  }
}

async function getMealImage(id){
    Results = [];
    try {
        const token = await getAccessToken();
        const response = await axios.get(fatSecretURL, {
            params: {
                food_id: id,
                format: 'json'
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const food = response.data.food;
        const images = food.food_images?.food_image
            ? Array.isArray(food.food_images.food_image)
                ? food.food_images.food_image
                : [food.food_images.food_image]
            : [];
        const results = images.map(img => ({ image_url: img.image_url }));
        return results;
    }
    catch (error){
        console.error('Error getting meal image', error);
        throw error;
    }
}
module.exports = { getMealImage };