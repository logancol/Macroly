import { useState, useEffect } from 'react'
import MealCard from './components/mealCard/mealCard.jsx';
import MacroSearch from './components/macroSearch/macroSearch.jsx';
import SearchResults from './components/searchResults/searchResults.jsx';
import { APIProvider } from "@vis.gl/react-google-maps";
import Header from './components/Header/Header.jsx';
import './App.css'
import axios from 'axios'

function App() {
  // getting user location
  const [location, setLocation] = useState({ latitude: null, longitude: null});
  const [searchResults, setSearchResults] = useState([]);
  const [nutrientSearch, setNutrientSearch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const GOOGLE_API_KEY = 'AIzaSyBmKlwHKv7-eUnkJuc0JsBerL3pDsj6FhA'
  const getUserLocation = () => {
    console.log("getting location")
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

  const getUserLocationClick = () => {
    getUserLocation();
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
    setNutrientSearch({
      protein: form.protein,
      carbs: form.carbs,
      calories: form.calories,
      fat: form.fat
    })
    console.log(response.data);
  }

  return (
    <>
      <Header />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: "3rem", backgroundColor: "#ffffff", height: "85vh"}}>
      {location.latitude == null && <button className="location-button" onClick={getUserLocationClick}>Share My Location</button>}
      <div className="home-container">
        {searchResults.length == 0 && <div className="macro-search-container">
          <h1>Food Search</h1>
          <h2>Share your location and select desired macros to perform a search of nearby meals!</h2>
              <MacroSearch location=
              {{latitude: location.latitude? location.latitude : 0,
                longitude: location.longitude? location.longitude : 0}} searchHandler={getSearchResults}/>
          <br></br>
        </div>
        }
          {searchResults.length > 0 &&
          <SearchResults searchResults={searchResults} userCenter={{lat: location.latitude, lng:location.longitude}}/>}
      </div>
      </div>
    </>
  )
}

export default App
