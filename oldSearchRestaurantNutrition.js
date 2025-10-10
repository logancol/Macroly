const axios = require('axios');
const fatSecretURL = "https://platform.fatsecret.com/rest/foods/search/v4"

const instantURL = "https://trackapi.nutritionix.com/v2/search/instant"
const detailedURL = "https://trackapi.nutritionix.com/v2/search/item"
async function searchRestaurantNutrition(name){

    // name being the restaurant name
    instantResults = [];
    try {
        const response = await axios.get(instantURL, {
        params: {
            query: name // restaurant name (could be any food item as well)
        },
        headers: { // pass api key, app id, request json
            'x-app-id': process.env.NUTRITIONX_ID,
            'x-app-key': process.env.NUTRITIONX_KEY,
            'Content-Type': 'application/json'
        }
        });
        instantResults = response.data.branded;
    }
    catch (error){
        console.error('Error Searching Nutritionix Instant API:', error);
        throw error;
    }
    // now for each item in the instant results we hit search-item endpoint with the nix_item_id to get macroinfo
    // note we can get macro, image info, everything we need
    nixIds = instantResults.map(({ nix_item_id }) => nix_item_id);
    nixIds = nixIds.splice(0, 3); // avoid hitting usage limits for now
    const detailedResults = await Promise.all (
        nixIds.map(async (nix_item_id) => {
        try {
            const detailedResponse = await axios.get(detailedURL, {
                params: { nix_item_id },
                headers: {
                    'x-app-id': process.env.NUTRITIONX_ID,
                    'x-app-key': process.env.NUTRITIONX_KEY,
                    'Content-Type': 'application/json'
                }
            });
            return detailedResponse.data;
        }
        catch (error){
            console.error('Error Hitting Nutritionix Item Search API:', error);
            throw error;
        }
    }));

    // this approach won't work with the rate limit, try to split up between nutritionix and fat secret api
    return detailedResults;