import { useState, useEffect } from 'react'
import MealCard from './components/mealCard/mealCard.jsx';
import MacroSearch from './components/macroSearch/macroSearch.jsx';
import './App.css'
import axios from 'axios'

function App() {
  // getting user location
  const [location, setLocation] = useState({ latitude: null, longitude: null});
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

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

  const getSearchResults = async (form) => {
    const response = await axios.get("http://localhost:8626/macroSearch", {
      params: {
        latitude: location.latitude,
        longitude: location.longitude,
        protein: form.protein,
        carbs: form.carbs,
        fat: form.fat,
        calories: form.calories,
        radius: 20000 // 20 km radius by default will make this adjustable
      }
    });
    setSearchResults(response.data);
    console.log(response.data);
  }

  useEffect(() => {
    getUserLocation();
  }, [])

  return (
    <>
    <div className="home-container">
      <div className="macro-search-container">
        <h1>Macroly Food Search</h1>
        <h2>Input the desired macros and calories for your meal</h2>
            <MacroSearch location=
            {{latitude: location.latitude? location.latitude : 0,
              longitude: location.longitude? location.longitude : 0}} searchHandler={getSearchResults}/>
        <br></br>
      </div>
        {searchResults.length > 0 &&
        <div className="meal-cards-container">
            {searchResults.map((meal, index) => {
              return <MealCard key={index} {...meal}></MealCard>
            })}
        </div>}
      </div>
    </>
  )
}

export default App
