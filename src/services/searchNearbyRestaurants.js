const axios = require('axios');

const baseURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
async function searchNearbyRestaurants(Latitude, Longitude, Radius){
    try {
        const response = await axios.get(baseURL, {
            params: {
                location: `${Latitude},${Longitude}`,
                radius: Radius,
                type: 'restaurant',
                key: process.env.GOOGLE_API_KEY
            }
        });
        while (response.data.next_page_token){
            // get more results with next page token
        }
        const filteredData = response.data.results.map(({ name }) => ({ name }));
        return filteredData
    }
    catch (error){
        console.error('Error Searching For Nearby Restaurants:', error);
        throw error;
    }
}

module.exports = { searchNearbyRestaurants };