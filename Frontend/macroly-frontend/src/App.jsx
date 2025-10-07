import { useState, useEffect } from 'react'
import MealCard from './components/mealCard/mealCard.jsx';
import MacroSearch from './components/macroSearch/macroSearch.jsx';
import './App.css'
import axios from 'axios'

function App() {
  // getting user location
  const [location, setLocation] = useState({ latitude: null, longitude: null});
  const [error, setError] = useState(null);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8626/restaurantNutritionSearch", {
      params: {name: "Chipolte"}
    });
    console.log(response.data);
  }

  useEffect(() => { // do on app start
    fetchAPI()
  }, [])

  const getUserLocation = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({latitude, longitude});
        },
        (err) => {
          setError(err.message);
        }
      );
    }
    else {
      setError("Geolocation not supported by browser")
    }
  }

  useEffect(() => {
    getUserLocation();
  }, [])

  // we have user location, from then lets get a list of restaurants, then load in the items calling searchRestaurantNutrition for each
  // using a card component

  const mockMeal = {
    food_name: "Chicken Bowl",
    photo: "https://placehold.co/300x200",
    calories: 600,
    macros: {
      protein: 40,
      carbs: 50,
      fat: 20,
    },
  }

  return (
    <>
      <div>
        <h1>Macroly Food Search</h1>
        <h2>Input the desired macros and calories for your meal</h2>
        <div className="macro-search-container">
          <MacroSearch location=
          {{latitude: location.latitude? location.latitude : 0,
           longitude: location.longitude? location.longitude : 0}}/>
        </div>
      </div>
    </>
  )
}

export default App
