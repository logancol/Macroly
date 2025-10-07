// Reaches out to google places api and gets a list of restaurants in some user specified radius

const axios = require('axios');
const baseURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
async function searchNearbyRestaurants(Latitude, Longitude, Radius){
    try {
        let allResults = [];
        let nextPageToken = null;
        do{
            // make call
            const response = await axios.get(baseURL, {
                params: {
                    location: `${Latitude},${Longitude}`,
                    radius: Radius,
                    type: 'restaurant',
                    key: process.env.GOOGLE_API_KEY,
                    ...(nextPageToken && {pagetoken: nextPageToken})}
                });
            allResults = allResults.concat(response.data.results.map(({ name, vicinity }) => ({ name, vicinity })));
            // returning restaurant name and address
            nextPageToken = response.data.next_page_token;
            // if google gives back a next page token we'll use it to get the rest of the results.
            if(nextPageToken){
                await new Promise(resolve => setTimeout(resolve, 2000)) // next page token takes a sec to become valid
            }
        } while (nextPageToken);
        return allResults;
    }
    catch (error){
        console.error('Error Searching For Nearby Restaurants:', error);
        throw error;
    }
}

module.exports = { searchNearbyRestaurants };