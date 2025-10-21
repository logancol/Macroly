import { useState } from 'react';
import MealCard from '../mealCard/mealCard.jsx';
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import './searchResults.css';


// render all the cards, display map with pins associated with locations
function SearchResults ( {searchResults, userCenter }) {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBmKlwHKv7-eUnkJuc0JsBerL3pDsj6FhA",
        libraries: ["places"],
    });

    return (
        <div className="results-container">
            {isLoaded && 
                <div>
                    <GoogleMap
                        center={userCenter}
                        zoom={14}
                        mapContainerStyle={{ width: "50rem", height: "50rem" }}
                    ></GoogleMap>
                    {searchResults.map((meal, index) => {
                        return <Marker key={index} position={meal.location}/>
                    })}
                </div>
            }   
            <div className="cards">
                {searchResults.map((meal, index) => {
                    return <MealCard key={index} {...meal}></MealCard>
                })}
            </div>
        </div>
    );
}

export default SearchResults